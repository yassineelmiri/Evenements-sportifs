import { createSlice } from "@reduxjs/toolkit";

const participantsSlice = createSlice({
  name: "participants",
  initialState: {
    participants: [], // Liste initiale vide
    loading: false,   // État de chargement
    error: null,      // Aucun message d'erreur par défaut
  },
  reducers: {
    // Définir la liste des participants
    setParticipants: (state, action) => {
      state.participants = action.payload;
      state.loading = false;
      state.error = null; // Réinitialiser les erreurs
    },

    // Ajouter un participant à la liste
    addParticipant: (state, action) => {
      state.participants.push(action.payload);
      state.error = null; // Réinitialiser les erreurs
    },

    // Déclencher le chargement
    startLoading: (state) => {
      state.loading = true;
      state.error = null; // Réinitialiser les erreurs
    },

    // Gérer les erreurs
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Supprimer un participant de la liste
    deleteParticipant: (state, action) => {
      state.participants = state.participants.filter(
        (participant) => participant._id !== action.payload
      );
      state.error = null; // Réinitialiser les erreurs
    },
  },
});

// Exporter les actions
export const {
  setParticipants,
  addParticipant,
  startLoading,
  setError,
  deleteParticipant,
} = participantsSlice.actions;

// Exporter le reducer
const participantsReducer = participantsSlice.reducer;
export { participantsReducer };
