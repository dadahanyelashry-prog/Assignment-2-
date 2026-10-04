import { findAllOrders, findOrderById } from "./orders-db.js";

// 1. Load every order from the database
export async function loadOrders() {
  const orders = await findAllOrders();
  return orders;
}

// 2. Only orders from Giza that are cancelled
export function myOrders(orders) {
  return orders.filter(
    (order) => order.city === "Giza" && order.status === "cancelled"
  );
}

// 3. Highest single price (0 for an empty list)
export function summarize(orders) {
  return orders.reduce(
    (highest, order) => (order.price > highest ? order.price : highest),
    0
  );
}

// 4. Label for one order, or a message if the id doesn't exist
export async function describeOrder(id) {
  try {
    const order = await findOrderById(id);
    return `${order.quantity} x ${order.item} for ${order.student}`;
  } catch (error) {
    return `No order with id ${id}`;
  }
}

// 5. JSON text with only item and quantity
export function toJsonLines(orders) {
  const trimmed = orders.map((order) => ({
    item: order.item,
    quantity: order.quantity,
  }));
  return JSON.stringify(trimmed);
}