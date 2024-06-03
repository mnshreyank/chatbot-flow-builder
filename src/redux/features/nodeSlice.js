import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodeList: [],
  selectedNode: null,
  isEditing: false,
};

const nodeSlice = createSlice({
  name: "NodeSlice",
  initialState,
  reducers: {
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setNodesList: (state, action) => {
      state.nodeList.push(action.payload);
    },
  },
});

export const { setSelectedNode, setEditing, setNodesList } = nodeSlice.actions;

export default nodeSlice.reducer;
