
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createBill, updateBill } from "../../api/billsApi";
import { useToast } from "../../hooks/useToast";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import LoadingSpinner from "./LoadingSpinner";

function BillCreationPanel({ setCurrentView, selectedBill }) {
  const [formData, setFormData] = useState({
    name: "",
    deliveryDate: "",
    number: "",
    customer: "",
    lineItems: [{ itemName: "", quantity: "", price: "" }],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const { showToast } = useToast();
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    language,
    setLanguage,
  } = useSpeechRecognition();

  const aiInputRef = useRef(null);

  useEffect(() => {
    if (selectedBill) {
      setFormData({
        name: selectedBill.name || "",
        deliveryDate: selectedBill.deliveryDate
          ? new Date(selectedBill.deliveryDate).toISOString().split("T")[0]
          : "",
        number: selectedBill.number || "",
        customer: selectedBill.customer || "",
        lineItems:
          selectedBill.lineItems && selectedBill.lineItems.length > 0
            ? selectedBill.lineItems.map((item) => ({
                itemName: item.itemName,
                quantity: String(item.quantity),
                price: String(item.price),
              }))
            : [{ itemName: "", quantity: "", price: "" }],
      });
    }
  }, [selectedBill]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Bill name is required";
    if (!formData.deliveryDate) newErrors.deliveryDate = "Delivery date is required";
    if (!formData.number.trim()) newErrors.number = "Bill number is required";
    if (!formData.customer.trim()) newErrors.customer = "Customer name is required";

    const lineItemErrors = [];
    formData.lineItems.forEach((item, index) => {
      const itemErrors = {};
      if (!item.itemName.trim()) itemErrors.itemName = "Item name is required";
      if (!item.quantity) {
        itemErrors.quantity = "Quantity is required";
      } else if (isNaN(item.quantity) || Number(item.quantity) <= 0) {
        itemErrors.quantity = "Quantity must be a positive number";
      }
      if (!item.price) {
        itemErrors.price = "Price is required";
      } else if (isNaN(item.price) || Number(item.price) <= 0) {
        itemErrors.price = "Price must be a positive number";
      }

      if (Object.keys(itemErrors).length > 0) {
        lineItemErrors[index] = itemErrors;
      }
    });

    if (lineItemErrors.length > 0) {
      newErrors.lineItems = lineItemErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...formData.lineItems];
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      lineItems: updatedLineItems,
    }));
  };

  const addLineItem = () => {
    setFormData((prev) => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { itemName: "", quantity: "", price: "" },
        { itemName: "", quantity: "", price: "" },
        { itemName: "", quantity: "", price: "" },
      ],
    }));
  };

  const removeLineItem = (index) => {
    const updatedLineItems = formData.lineItems.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      lineItems:
        updatedLineItems.length > 0
          ? updatedLineItems
          : [{ itemName: "", quantity: "", price: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      const billData = {
        ...formData,
        deliveryDate: new Date(formData.deliveryDate).toISOString(),
        lineItems: formData.lineItems.map((item) => ({
          itemName: item.itemName,
          quantity: Number(item.quantity),
          price: Number(item.price),
          
        })),
        totalAmount: formData.lineItems
        .reduce((total, item) => {
          const quantity = Number(item.quantity) || 0;
          const price = Number(item.price) || 0;
          return total + quantity * price;
        }, 0)
        .toFixed(2),
        status: selectedBill ? formData.status || selectedBill.status : "Pending",
      };

      console.log("Sending bill data:", billData);

      let response;
      if (selectedBill && selectedBill._id) {
        response = await updateBill(selectedBill._id, billData);
        showToast("Bill updated successfully", "success");
      } else {
        response = await createBill(billData);
        showToast("Bill created successfully", "success");
      }

      if (!selectedBill) {
        setFormData({
          name: "",
          deliveryDate: "",
          number: "",
          customer: "",
          lineItems: [{ itemName: "", quantity: "", price: "" }],
        });
      }

      setCurrentView("dashboard");
      return response;
    } catch (error) {
      console.error("Error saving bill:", error);
      console.error("Error details:", error.response?.data);
      showToast(
        error.response?.data?.error || "Failed to save bill. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAIGenerate = async () => {
    try {
      setIsProcessingAI(true);

      const aiInput = transcript || (aiInputRef.current ? aiInputRef.current.value : "");

      if (!aiInput.trim()) {
        showToast("Please provide input for AI bill generation", "error");
        return;
      }

      const response = await fetch("/api/ai/generate-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: aiInput, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to process AI request");
      }

      const data = await response.json();

      setFormData({
        name: data.name || "",
        deliveryDate: data.deliveryDate || "",
        number: data.number || "",
        customer: data.customer || "",
        lineItems:
          data.lineItems && data.lineItems.length > 0
            ? data.lineItems.map((item) => ({
                itemName: item.itemName,
                quantity: String(item.quantity),
                price: String(item.price),
              }))
            : [{ itemName: "", quantity: "", price: "" }],
      });

      showToast("Bill generated with AI successfully", "success");
      resetTranscript();
      if (aiInputRef.current) aiInputRef.current.value = "";
    } catch (error) {
      console.error("Error generating bill with AI:", error);
      showToast("Failed to generate bill with AI. Please try again.", "error");
    } finally {
      setIsProcessingAI(false);
    }
  };

  return (
    <motion.div
      className="bill-creation-panel p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="panel-header flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{selectedBill ? "Edit Bill" : "Create New Bill"}</h2>
        <motion.button
          className="back-button flex items-center px-3 py-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          onClick={() => setCurrentView("dashboard")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Dashboard</span>
        </motion.button>
      </div>

      <div className="ai-section mb-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-2">Create Bill with AI</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Use voice or text to describe your bill in English, Hindi, or Gujarati</p>

        <div className="ai-controls flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="language-selector w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isListening}
              className="w-full p-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi</option>
              <option value="gu-IN">Gujarati</option>
            </select>
          </div>

          <div className="voice-controls w-full sm:w-1/3">
            {isListening ? (
              <motion.button
                className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={stopListening}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundColor: ["#ef4444", "#3b82f6", "#ef4444"],
                  transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="6" y="6" width="12" height="12"></rect>
                </svg>
                <span>Stop Listening</span>
              </motion.button>
            ) : (
              <motion.button
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={startListening}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isProcessingAI}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                <span>Start Voice Input</span>
              </motion.button>
            )}
          </div>
        </div>

        {transcript && (
          <div className="transcript-container mt-4 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-inner">
            <p className="transcript-label text-sm font-medium">Voice Input:</p>
            <p className="transcript-text text-sm break-words">{transcript}</p>
            <motion.button
              className="mt-2 px-3 py-1 bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={resetTranscript}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear
            </motion.button>
          </div>
        )}

        <div className="text-input-container mt-4">
          <textarea
            ref={aiInputRef}
            className="w-full p-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Or type your bill description here..."
            rows={3}
            disabled={isListening || isProcessingAI}
          ></textarea>
        </div>

        <motion.button
          className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          onClick={handleAIGenerate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isProcessingAI || isListening}
        >
          {isProcessingAI ? (
            <>
              <LoadingSpinner size="small" />
              <span className="ml-2">Processing...</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16"></path>
                <path d="M12 6v6l4 2"></path>
                <path d="M9 17c-2.5-1.5-4-4-4-7 0-2.76 1.12-5.26 2.93-7.07"></path>
                <path d="M15 17c2.5-1.5 4-4 4-7 0-2.76-1.12-5.26-2.93-7.07"></path>
              </svg>
              <span>Generate Bill with AI</span>
            </>
          )}
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="bill-form mt-6">
        <div className="form-header grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium">Bill Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="deliveryDate" className="block text-sm font-medium">Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.deliveryDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.deliveryDate && <span className="text-red-500 text-xs mt-1 block">{errors.deliveryDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="number" className="block text-sm font-medium">Bill Number</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.number ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.number && <span className="text-red-500 text-xs mt-1 block">{errors.number}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customer" className="block text-sm font-medium">Customer</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.customer ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {errors.customer && <span className="text-red-500 text-xs mt-1 block">{errors.customer}</span>}
          </div>
        </div>

        <div className="line-items-section mt-6">
          <h3 className="text-lg font-medium mb-4">Line Items</h3>

          <div className="line-items-header grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
            <div className="item-name-header">Item Name</div>
            <div className="item-quantity-header">Quantity</div>
            <div className="item-price-header">Price</div>
            <div className="item-actions-header">Actions</div>
          </div>

          <AnimatePresence>
            {formData.lineItems.map((item, index) => (
              <motion.div
                key={index}
                className="line-item grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="item-name">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={item.itemName}
                    onChange={(e) => handleLineItemChange(index, "itemName", e.target.value)}
                    className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lineItems && errors.lineItems[index]?.itemName ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  />
                  {errors.lineItems && errors.lineItems[index]?.itemName && (
                    <span className="text-red-500 text-xs mt-1 block">{errors.lineItems[index].itemName}</span>
                  )}
                </div>

                <div className="item-quantity">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleLineItemChange(index, "quantity", e.target.value)}
                    className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lineItems && errors.lineItems[index]?.quantity ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    min="1"
                    step="1"
                  />
                  {errors.lineItems && errors.lineItems[index]?.quantity && (
                    <span className="text-red-500 text-xs mt-1 block">{errors.lineItems[index].quantity}</span>
                  )}
                </div>

                <div className="item-price">
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => handleLineItemChange(index, "price", e.target.value)}
                    className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lineItems && errors.lineItems[index]?.price ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    min="0.01"
                    step="0.01"
                  />
                  {errors.lineItems && errors.lineItems[index]?.price && (
                    <span className="text-red-500 text-xs mt-1 block">{errors.lineItems[index].price}</span>
                  )}
                </div>

                <div className="item-actions flex items-center justify-center">
                  <motion.button
                    type="button"
                    className="remove-item-button flex items-center px-2 py-1 bg-red-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => removeLineItem(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={formData.lineItems.length <= 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            type="button"
            className="add-line-item-button flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-4"
            onClick={addLineItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add 3 More Items</span>
          </motion.button>
        </div>

        <div className="bill-summary mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
          <div className="bill-total flex justify-between items-center">
            <span className="text-lg font-medium">Total Amount:</span>
            <span className="total-amount text-lg font-semibold">
              ${formData.lineItems
                .reduce((total, item) => {
                  const quantity = Number(item.quantity) || 0;
                  const price = Number(item.price) || 0;
                  return total + quantity * price;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>

        <div className="form-actions flex justify-end space-x-4 mt-6">
          <motion.button
            type="button"
            className="cancel-button px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => setCurrentView("dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            className="save-button flex items-center px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span>Save Bill</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default BillCreationPanel;
