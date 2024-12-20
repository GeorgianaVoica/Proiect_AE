import api from "./api";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const addToCart = async (productId, quantity, price, title) => {
  const response = await api.post("/cart", { productId, quantity, price, title });
  return response.data;
};

export const updateCart = async (productId, quantity, price, title) => {
  const response = await api.put(`/cart/${productId}`, { quantity, price, title });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};
