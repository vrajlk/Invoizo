import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

export async function fetchBills() {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    console.error('Error details:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to fetch bills');
  }
}

export async function fetchBillsBYnumber(number) {
  try {
    const response = await api.get(`/search-by-number/${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch bills');
  }
}


export async function fetchBill(id) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bill ${id}:`, error);
    console.error('Error details:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Bill not found');
  }
}

export async function createBill(billData) {
  try {
    console.log('Sending bill data:', billData);
    const response = await api.post('/', billData);
    return response.data;
  } catch (error) {
    console.error('Error creating bill:', error);
    console.error('Error details:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to create bill');
  }
}

export async function updateBill(id, billData) {
  try {
    console.log('Updating bill:', id, billData);
    const response = await api.put(`/${id}`, billData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bill ${id}:`, error);
    console.error('Error details:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to update bill');
  }
}

export async function deleteBill(id) {
  try {
    await api.delete(`/${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting bill ${id}:`, error);
    console.error('Error details:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to delete bill');
  }
}