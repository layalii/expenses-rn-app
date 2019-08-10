import store from "./_store";
import { AsyncStorage } from "react-native";

export const BASE = `http://172.20.10.2:8000/api`;

export const transactions = () => `${BASE}/transactions`;
export const categories = () => `${BASE}/categories`;
export const deleteTransaction = id => `${BASE}/transactions/${id}`;

export const getToken = () => {
  try {
    const token = AsyncStorage.getItem("expenses-app-user-token");
    if (!token) {
      store.dispatch({ type: "SIGN_USER", user: null });
      return;
    }
    return token;
  } catch (e) {
    AsyncStorage.setItem("expenses-app-user-token", "");
    store.dispatch({ type: "SIGN_USER", user: null });
    return;
  }
};
