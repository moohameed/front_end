export const getOrders = () =>
  fetch('https://dummyjson.com/carts/1').then((res) => res.json());

export const getRevenue = () =>
  fetch('https://dummyjson.com/carts').then((res) => res.json());

export const getInventory = () =>
  fetch('https://dummyjson.com/products').then((res) => res.json());

export const getCustomers = () =>
  fetch('https://dummyjson.com/users').then((res) => res.json());
