// Mock dashboard API for demo purposes
// In a real application, this would make actual API calls to your backend

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchDashboardData() {
  // Simulate API call
  await delay(1500)

  // Return mock dashboard data
  return {
    revenue: {
      total: 613200,
      period: "January - July 2023",
      activeTab: "monthly",
      chartData: [65000, 72000, 84000, 78000, 92000, 104000, 118200],
    },
    traffic: {
      period: "January 1, 2022 - December 31, 2022",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      values: [75, 80, 80, 45, 30, 10, 35, 80, 65, 20, 15, 100],
    },
    customers: {
      total: 44725,
      changePercentage: -12.4,
      activeTab: "monthly",
    },
    orders: {
      total: 385,
      changePercentage: 17.2,
      activeTab: "monthly",
    },
    recentBills: [
      {
        _id: "bill_1",
        name: "Invoice #1001",
        number: "1001",
        customer: "Acme Corp",
        amount: 1250.75,
        createdAt: new Date(new Date().setHours(new Date().getHours() - 1)),
        status: "Paid",
      },
      {
        _id: "bill_2",
        name: "Invoice #1002",
        number: "1002",
        customer: "Globex Inc",
        amount: 875.5,
        createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
        status: "Pending",
      },
      {
        _id: "bill_3",
        name: "Invoice #1003",
        number: "1003",
        customer: "Stark Industries",
        amount: 3200.0,
        createdAt: new Date(new Date().setHours(new Date().getHours() - 5)),
        status: "Paid",
      },
      {
        _id: "bill_4",
        name: "Invoice #1004",
        number: "1004",
        customer: "Wayne Enterprises",
        amount: 1750.25,
        createdAt: new Date(new Date().setHours(new Date().getHours() - 7)),
        status: "Overdue",
      },
      {
        _id: "bill_5",
        name: "Invoice #1005",
        number: "1005",
        customer: "Umbrella Corp",
        amount: 950.0,
        createdAt: new Date(new Date().setHours(new Date().getHours() - 9)),
        status: "Pending",
      },
    ],
    pendingBills: {
      count: 12,
      changePercentage: 8.5,
      totalAmount: 15750.25,
    },
    todayRevenue: {
      amount: 4250.75,
      billCount: 8,
    },
  }
}
