import { configureStore, createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: { items: [] },
  reducers: {
    addToList: (state, action) => {
      console.log(todoSlice.actions);
      const newItem = {
        id: Date.now(),
        data: action.payload,
      };
      state.items.push(newItem);
    },
    deleteList: (state, action) => {
      console.log(action);
      const idToDelete = action.payload;
      state.items = state.items.filter((item) => item.id !== idToDelete);
    },
    editList: (state, action) => {
      const { id, data } = action.payload;
      const itemToEdit = state.items.find((item) => item.id === id);
      if (itemToEdit) {
        itemToEdit.data = data;
      }
      // console.log(itemToEdit);
    },
  },
});

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export const { addToList, deleteList, editList } = todoSlice.actions;
