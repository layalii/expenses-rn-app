import { combineReducers, createStore } from "redux";

const token = (state = "", action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.token;
    default:
      return state;
  }
};

const transactions = (state = [], action) => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return action.transactions;
    // case "UPDATE_TRANSACTION":
    //   return state.map(item => {
    //     if (item._id === action.transaId) {
    //       return action.updatedTransa;
    //     }
    //     return item;
    //   });
    case "ADD_TRANSACTION":
      return state.concat(action.newTransa);
    case "DELETE_TRANSACTION":
      return state.filter(transa => transa._id !== action.transaToDelete);

    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return action.categories;
    // case "UPDATE_CATEGORY":
    //   return state.map(item => {
    //     if (item._id === action.categoryId) {
    //       return action.updatedCategory;
    //     }
    //     return item;
    //   });
    case "ADD_CATEGORY":
      return state.concat(action.newCategory);
    // case "DELETE_CATEGORY":
    //   return state.filter(catgory => catgory._id !== action.categoryToDelete);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  token,
  transactions,
  categories
});

export default createStore(rootReducer);
