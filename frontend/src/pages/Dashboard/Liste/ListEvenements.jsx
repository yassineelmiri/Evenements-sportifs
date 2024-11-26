import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvenment,
  deleteEvenment,
} from "../../../redux/apiCalls/evenmentCall";
import Sidebare from "../../../components/Sidebare";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi"; // Importing icons

const ListEvenements = () => {
  const dispatch = useDispatch();
  const evenments = useSelector((state) => state.evenment.evenments);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);  // État pour le mode sombre

  useEffect(() => {
    dispatch(fetchEvenment(1));
    
    // Vérifier dans localStorage si le mode sombre est activé
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, [dispatch]);

  useEffect(() => {
    // Sauvegarder le mode sombre dans localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleDelete = (id) => {
    dispatch(deleteEvenment(id));
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // Bascule entre le mode clair et sombre
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebare />
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 overflow-auto">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Liste des Événements</h2>
            <span className="text-gray-500 dark:text-gray-300">{evenments.length} total</span>
          </div>

          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">TITLE</th>
                  <th className="py-3 px-4 text-left">IMAGE</th>
                  <th className="py-3 px-4 text-left">CATEGORY</th>
                  <th className="py-3 px-4 text-left">PLACES</th>
                  <th className="py-3 px-4 text-left">STADE</th>
                  <th className="py-3 px-4 text-left">DATE DE CRÉATION</th>
                  <th className="py-3 px-4 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {evenments.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-3 px-4">{event._id}</td>
                    <td className="py-3 px-4">{event.title}</td>
                    <td className="py-3 px-4">
                      <img
                        src={event.image.url}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-3 px-4">{event.category}</td>
                    <td className="py-3 px-4">{event.places}</td>
                    <td className="py-3 px-4">{event.stade}</td>
                    <td className="py-3 px-4">{formatDate(event.createdAt)}</td>
                    <td className="py-3 px-4 flex space-x-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleView(event)}
                      >
                        <FiEye size={20} />
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleEdit(event)}
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(event._id)}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for editing event */}
        {showModal && selectedEvent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Détails de l'Événement</h3>
              <p><strong>Titre:</strong> {selectedEvent.title}</p>
              <p><strong>Stade:</strong> {selectedEvent.stade}</p>
              <p><strong>Places:</strong> {selectedEvent.places}</p>
              <p><strong>Catégorie:</strong> {selectedEvent.category}</p>
              <p><strong>Date:</strong> {selectedEvent.horaire}</p>
              <img
                src={selectedEvent.image.url}
                alt={selectedEvent.title}
                className="w-full h-40 object-cover mt-4"
              />
              <button
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
                onClick={handleCloseModal}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListEvenements;
