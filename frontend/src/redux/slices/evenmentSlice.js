import { createSlice } from "@reduxjs/toolkit";
const evenmentSlice = createSlice({
  name: "Evenment",
  initialState: {
    evenments: [],
    selectedEvenment: null,
    loading: false,
    error: null,
    evenmentsCount: 0,
    isFetching: false,
  },
  reducers: {
    setEvenments: (state, action) => {
      state.evenments = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload || true;
      state.error = null;
    },
    setSelectedEvenment: (state, action) => {
      state.selectedevenment = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setEvenmentsCount: (state, action) => {
      state.evenmentsCount = action.payload;
      state.loading = false;
    },
    deleteEvenmentStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    deleteEvenmentSuccess: (state, action) => {
      state.isFetching = true;
      state.evenments = state.evenments.filter(
        (Evenment) => Evenment._id !== action.payload
      );
    },
    deleteEvenmentFailure: (state) => {
      state.isFetching = false;
      state.error = "Error deleting Evenment";
    },
    addCommentToEvenment(state, action) {
      state.Evenment.comments.push(action.payload);
    },
  },
});

export const {
  setEvenments,
  setLoading,
  setSelectedEvenment,
  setError,
  setEvenmentsCount,
  deleteEvenmentStart,
  deleteEvenmentSuccess,
  deleteEvenmentFailure,
} = evenmentSlice.actions;

const evenmentReducer = evenmentSlice.reducer;
const evenmentActions = evenmentSlice.actions;

export { evenmentReducer, evenmentActions };
