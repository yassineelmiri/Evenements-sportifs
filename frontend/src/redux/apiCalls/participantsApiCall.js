import request from "../../utils/request";
import { toast } from "react-toastify";
import {
  setParticipants,
  addParticipant,
  startLoading,
  setError,
  deleteParticipant,
} from "../slices/participantsSlice";

// Fetch all participants for an event
export const fetchParticipants = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await request.get(`/api/participants`);
    dispatch(setParticipants(data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error fetching participants.";
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  }
};

// Add a new participant
export const addNewParticipant = (participantData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const { data } = await request.post("/api/participants", participantData);
    dispatch(addParticipant(data));
    toast.success("Participant added successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error adding participant.";
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  }
};

// Delete a participant
export const deleteParticipantById = (participantId) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await request.delete(`/api/participants/${participantId}`);
    dispatch(deleteParticipant(participantId));
    toast.success("Participant deleted successfully!");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error deleting participant.";
    dispatch(setError(errorMessage));
    toast.error(errorMessage);
  }
};
