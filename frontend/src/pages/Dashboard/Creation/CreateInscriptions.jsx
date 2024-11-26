import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvenment } from "../../../redux/apiCalls/evenmentCall";
import { addNewParticipant } from "../../../redux/apiCalls/participantsApiCall";
import Sidebare from "../../../components/Sidebare";

const CreateInscriptions = () => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [eventId, setEventId] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const { evenments, error, success } = useSelector((state) => state.evenment);

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
        console.error("Erreur lors de la récupération des utilisateurs :", err);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventId || selectedParticipants.length === 0) {
      alert("Veuillez sélectionner un événement et au moins un participant.");
      return;
    }
    console.log();
    

    const participantData = {
      evenments: eventId,
      participants: selectedParticipants,
    };

    dispatch(addNewParticipant(participantData));

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
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-gray-900 w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6 text-center">
            Ajouter Les Participants
          </h2>

          {error && (
            <div className="text-red-500 mb-4 text-center">
              Une erreur s'est produite : {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 mb-4 text-center">
              Participant(s) ajouté(s) avec succès !
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélection de l'événement */}
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

            {/* Sélection des participants */}
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

            {/* Bouton de soumission */}
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
