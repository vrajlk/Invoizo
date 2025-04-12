// Mock bills API for demo purposes
// In a real application, this would make actual API calls to your backend

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock bills storage
let MOCK_BILLS = [
  {
    _id: "bill_1",
    name: "Invoice #1001",
    number: "1001",
    customer: "Acme Corp",
    deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    amount: 1250.75,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 1)),
    status: "Paid",
    lineItems: [
      { itemName: "Product A", quantity: 5, price: 150.0 },
      { itemName: "Product B", quantity: 2, price: 250.0 },
      { itemName: "Service C", quantity: 1, price: 100.75 },
    ],
  },
  {
    _id: "bill_2",
    name: "Invoice #1002",
    number: "1002",
    customer: "Globex Inc",
    deliveryDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    amount: 875.5,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    status: "Pending",
    lineItems: [
      { itemName: "Product X", quantity: 3, price: 125.5 },
      { itemName: "Service Y", quantity: 2, price: 249.5 },
    ],
  },
]

export async function fetchBills() {
  // Simulate API call
  await delay(1000)

  return MOCK_BILLS
}

export async function fetchBill(id) {
  // Simulate API call
  await delay(800)

  const bill = MOCK_BILLS.find((bill) => bill._id === id)

  if (!bill) {
    throw new Error("Bill not found")
  }

  return bill
}

export async function createBill(billData) {
  // Simulate API call
  await delay(1500)

  // Calculate total amount
  const amount = billData.lineItems.reduce((total, item) => {
    return total + Number(item.quantity) * Number(item.price)
  }, 0)

  // Create new bill
  const newBill = {
    _id: `bill_${MOCK_BILLS.length + 1}`,
    ...billData,
    amount,
    createdAt: new Date(),
    status: "Pending",
  }

  // Add to mock storage
  MOCK_BILLS = [...MOCK_BILLS, newBill]

  return newBill
}

export async function updateBill(id, billData) {
  // Simulate API call
  await delay(1200)

  // Find bill index
  const billIndex = MOCK_BILLS.findIndex((bill) => bill._id === id)

  if (billIndex === -1) {
    throw new Error("Bill not found")
  }

  // Calculate total amount
  const amount = billData.lineItems.reduce((total, item) => {
    return total + Number(item.quantity) * Number(item.price)
  }, 0)

  // Update bill
  const updatedBill = {
    ...MOCK_BILLS[billIndex],
    ...billData,
    amount,
    updatedAt: new Date(),
  }

  // Update mock storage
  MOCK_BILLS = [...MOCK_BILLS.slice(0, billIndex), updatedBill, ...MOCK_BILLS.slice(billIndex + 1)]

  return updatedBill
}

export async function deleteBill(id) {
  // Simulate API call
  await delay(800)

  // Filter out the bill
  MOCK_BILLS = MOCK_BILLS.filter((bill) => bill._id !== id)

  return { success: true }
}
