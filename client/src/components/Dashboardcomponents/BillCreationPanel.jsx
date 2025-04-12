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
        deliveryDate: new Date(formData.deliveryDate).toISOString(), // Ensure ISO format
        lineItems: formData.lineItems.map((item) => ({
          itemName: item.itemName,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        status: selectedBill ? formData.status || selectedBill.status : "Pending", // Preserve status for updates
      };

      console.log("Sending bill data:", billData); // Debug payload

      let response;
      if (selectedBill && selectedBill._id) {
        response = await updateBill(selectedBill._id, billData);
        showToast("Bill updated successfully", "success");
      } else {
        response = await createBill(billData);
        showToast("Bill created successfully", "success");
      }

      // Reset form after creation
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
      return response; // Optional: use response if needed
    } catch (error) {
      console.error("Error saving bill:", error);
      console.error("Error details:", error.response?.data); // Debug backend error
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
      className="bill-creation-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="panel-header">
        <h2>{selectedBill ? "Edit Bill" : "Create New Bill"}</h2>
        <motion.button
          className="back-button"
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
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Dashboard</span>
        </motion.button>
      </div>

      <div className="ai-section">
        <h3>Create Bill with AI</h3>
        <p>Use voice or text to describe your bill in English, Hindi, or Gujarati</p>

        <div className="ai-controls">
          <div className="language-selector">
            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isListening}
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi</option>
              <option value="gu-IN">Gujarati</option>
            </select>
          </div>

          <div className="voice-controls">
            {isListening ? (
              <motion.button
                className="stop-listening-button"
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
                >
                  <rect x="6" y="6" width="12" height="12"></rect>
                </svg>
                <span>Stop Listening</span>
              </motion.button>
            ) : (
              <motion.button
                className="start-listening-button"
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
          <div className="transcript-container">
            <p className="transcript-label">Voice Input:</p>
            <p className="transcript-text">{transcript}</p>
            <button className="clear-transcript-button" onClick={resetTranscript}>
              Clear
            </button>
          </div>
        )}

        <div className="text-input-container">
          <textarea
            ref={aiInputRef}
            className="ai-text-input"
            placeholder="Or type your bill description here..."
            rows={3}
            disabled={isListening || isProcessingAI}
          ></textarea>
        </div>

        <motion.button
          className="generate-ai-button"
          onClick={handleAIGenerate}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isProcessingAI || isListening}
        >
          {isProcessingAI ? (
            <>
              <LoadingSpinner size="small" />
              <span>Processing...</span>
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

      <form onSubmit={handleSubmit} className="bill-form">
        <div className="form-header">
          <div className="form-group">
            <label htmlFor="name">Bill Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="deliveryDate">Delivery Date</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className={errors.deliveryDate ? "error" : ""}
            />
            {errors.deliveryDate && (
              <span className="error-message">{errors.deliveryDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="number">Bill Number</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              className={errors.number ? "error" : ""}
            />
            {errors.number && <span className="error-message">{errors.number}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customer">Customer</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className={errors.customer ? "error" : ""}
            />
            {errors.customer && (
              <span className="error-message">{errors.customer}</span>
            )}
          </div>
        </div>

        <div className="line-items-section">
          <h3>Line Items</h3>

          <div className="line-items-header">
            <div className="item-name-header">Item Name</div>
            <div className="item-quantity-header">Quantity</div>
            <div className="item-price-header">Price</div>
            <div className="item-actions-header">Actions</div>
          </div>

          <AnimatePresence>
            {formData.lineItems.map((item, index) => (
              <motion.div
                key={index}
                className="line-item"
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
                    onChange={(e) =>
                      handleLineItemChange(index, "itemName", e.target.value)
                    }
                    className={
                      errors.lineItems && errors.lineItems[index]?.itemName
                        ? "error"
                        : ""
                    }
                  />
                  {errors.lineItems && errors.lineItems[index]?.itemName && (
                    <span className="error-message">
                      {errors.lineItems[index].itemName}
                    </span>
                  )}
                </div>

                <div className="item-quantity">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleLineItemChange(index, "quantity", e.target.value)
                    }
                    className={
                      errors.lineItems && errors.lineItems[index]?.quantity
                        ? "error"
                        : ""
                    }
                    min="1"
                    step="1"
                  />
                  {errors.lineItems && errors.lineItems[index]?.quantity && (
                    <span className="error-message">
                      {errors.lineItems[index].quantity}
                    </span>
                  )}
                </div>

                <div className="item-price">
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleLineItemChange(index, "price", e.target.value)
                    }
                    className={
                      errors.lineItems && errors.lineItems[index]?.price
                        ? "error"
                        : ""
                    }
                    min="0.01"
                    step="0.01"
                  />
                  {errors.lineItems && errors.lineItems[index]?.price && (
                    <span className="error-message">
                      {errors.lineItems[index].price}
                    </span>
                  )}
                </div>

                <div className="item-actions">
                  <motion.button
                    type="button"
                    className="remove-item-button"
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
            className="add-line-item-button"
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
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add 3 More Items</span>
          </motion.button>
        </div>

        <div className="bill-summary">
          <div className="bill-total">
            <span>Total Amount:</span>
            <span className="total-amount">
              $
              {formData.lineItems
                .reduce((total, item) => {
                  const quantity = Number(item.quantity) || 0;
                  const price = Number(item.price) || 0;
                  return total + quantity * price;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>

        <div className="form-actions">
          <motion.button
            type="button"
            className="cancel-button"
            onClick={() => setCurrentView("dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>

          <motion.button
            type="submit"
            className="save-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" />
                <span>Saving...</span>
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