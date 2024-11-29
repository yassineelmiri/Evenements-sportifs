import request from "../../utils/request";
import { toast } from "react-toastify";
import {
  setEvenments,
  setLoading,
  setSelectedEvenment,
  setError,
  setEvenmentsCount,
} from "../slices/evenmentSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateEvenments = (EvenmentId, formData) => {  
  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }

    dispatch(setLoading(true));
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
    try {
      const { data } = await request.put(`/api/evenments/${EvenmentId}`,formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponse serveur :", data);
      dispatch(setEvenments(data));
      return data;
    } catch (error) {
      if (error.response) {
        console.error("Erreur API :", error.response.data);
        toast.error(error.response.data.message || "Erreur serveur.");
      } else {
        console.error("Erreur non liée à l'API :", error.message);
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};



// Fetch Evenments Based on Page Number
export function fetchEvenment(pageNumber) {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await request.get(
        `/api/evenments?pageNumber=${pageNumber}`
      );
      dispatch(setEvenments(data));
    } catch (error) {
      dispatch(setError("Erreur lors de la récupération des Evenments."));
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des Evenments."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Fetch Evenment by ID
export function fetchEvenmentById(id) {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await request.get(`/api/evenments/${id}`);
      dispatch(setSelectedEvenment(data));
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Erreur lors de la récupération du Evenment";
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Get Evenments Count
export function getEvenmentCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/evenments/count`);
      dispatch(setEvenmentsCount(data));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la récupération du nombre de Evenments."
      );
    }
  };
}

// Create Evenment
export function createEvenment(formData) {
  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }

    dispatch(setLoading(true));
    try {
      const { data } = await request.post("/api/evenments", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch(setEvenments(data));
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la création du Evenment."
      );
      console.error("Erreur lors de la création du Evenment :", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const deleteEvenment = createAsyncThunk(
  "Evenment/deleteEvenment",
  async (EvenmentId, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      return rejectWithValue("User is not authenticated");
    }

    try {
      const response = request.delete(`/api/evenments/${EvenmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the evenment");
      }

      return async (dispatch) => {
        dispatch(setLoading(true));
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
