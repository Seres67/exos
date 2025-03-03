import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action) {
      const post = {
        id: Date.now(),
        title: action.payload.title,
        content: action.payload.content,
      };
      state.push(post);
    },
    removePost(state, action) {
      const id = action.payload.id;
      const state = state.filter((post) => post.id !== id);
    },
  },
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;
