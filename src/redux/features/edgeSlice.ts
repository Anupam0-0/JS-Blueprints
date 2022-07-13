import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEdge, Connection, Edge } from "react-flow-renderer";
import toast from "react-hot-toast";
import { addEdgeThunk } from "../functions/addEdge.action";

export const initialState: Array<Edge> = [];

export const EdgeSlice = createSlice({
  name: "edge",
  initialState,
  reducers: {
    addEdgeReducer: (
      state: Array<Edge>,
      action: PayloadAction<Edge<any> | Connection>
    ) => {
      state = addEdge(action.payload, state);
      return state;
    },
    setEdgeReducer: (
      state: Array<Edge>,
      action: PayloadAction<Array<Edge>>
    ) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEdgeThunk.fulfilled, (state, action) => {
      console.log("addEdgeThunk.fulfilled", action.payload);
      if (action.payload === undefined) return state;
      const newEdge: Array<Edge<any>> = action.payload.edges;
      state = newEdge;
      return state;
    });
    builder.addCase(addEdgeThunk.rejected, (state, action) => {
      const error = action.error.message;
      if (action.payload === undefined || action.payload === null) {
        toast.error("Something went wrong");
      } else {
        console.log(error);

        toast.error(action.payload as string);
      }

      return state;
    });
  },
});

export const { addEdgeReducer, setEdgeReducer } = EdgeSlice.actions;
export default EdgeSlice.reducer;
