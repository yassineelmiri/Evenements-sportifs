import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchEvenment } from "../../../redux/apiCalls/evenmentCall";
import { addNewParticipant } from "../../../redux/apiCalls/participantsApiCall";
import Sidebare from "../../../components/Sidebare";

const CreateInscriptions = () => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [eventId, setEventId] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const { evenments } = useSelector((state) => state.evenment);

  useEffect(() => {
    // Récupération des événements
    dispatch(fetchEvenment(1));

    // Fetch des utilisateurs
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/profile");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        toast.error("Erreur lors de la récupération des utilisateurs !");
      }
    };

    fetchUsers();
  }, [dispatch]);


  const selectedEvent = evenments.find((event) => event._id === eventId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventId || selectedParticipants.length === 0) {
      toast.warning("Veuillez sélectionner un événement et au moins un participant.");
      return;
    }

    if (selectedEvent && selectedParticipants.length > selectedEvent.places) {
      toast.warning("Le nombre de participants dépasse les places disponibles !");
      return;
    }

    const participantData = {
      evenments: eventId,
      participants: selectedParticipants,
    };

    dispatch(addNewParticipant(participantData));
    toast.success("Participant(s) ajouté(s) avec succès !");
    setSelectedParticipants([]);
    setEventId("");
  };

  const handleCheckboxChange = (userId) => {
    setSelectedParticipants((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      <Sidebare />
      <ToastContainer/>
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-gray-900 w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6 text-center">
            Ajouter Les Participants
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="event"
                className="block text-sm font-medium text-gray-300"
              >
                Événement
              </label>
              <select
                id="event"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              >
                <option value="">Sélectionnez un événement</option>
                {evenments &&
                  evenments.map((event) => (
                    <option key={event._id} value={event._id}>
                      {event.title}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Participants
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-800 p-2 rounded-md border border-gray-600">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md hover:bg-gray-600"
                  >
                    <input
                      type="checkbox"
                      id={user._id}
                      value={user.username}
                      checked={selectedParticipants.includes(user.username)}
                      onChange={() => handleCheckboxChange(user.username)}
                      className="text-purple-600"
                    />
                    <label htmlFor={user._id} className="text-sm text-gray-300">
                      {user.username}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-500 transition"
              >
                Ajouter à la liste
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInscriptions;
