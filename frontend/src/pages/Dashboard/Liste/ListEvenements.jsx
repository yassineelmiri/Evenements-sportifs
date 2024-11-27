import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvenment,
  deleteEvenment,
} from "../../../redux/apiCalls/evenmentCall";
import Sidebare from "../../../components/Sidebare";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi"; // Importing icons
import { toast, ToastContainer } from "react-toastify";

const ListEvenements = () => {
  const dispatch = useDispatch();
  const evenments = useSelector((state) => state.evenment.evenments);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // État pour le mode sombre

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

  useEffect(() => {
    console.log("Evenements fetched: ", evenments);
  }, [evenments]);


  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce Evenements ?")) {
      dispatch(deleteEvenment(id));
      toast.success("supprimer ce participant parfait");
    }
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

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebare />
      <ToastContainer/>
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 overflow-auto">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Liste des Événements
            </h2>
            <span className="text-gray-500 dark:text-gray-300">
              {evenments.length} total
            </span>
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
                {Array.isArray(evenments) && evenments.length > 0 ? (
                  evenments.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
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
                      <td className="py-3 px-4">
                        {formatDate(event.createdAt)}
                      </td>
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-3 px-4 text-center text-gray-500"
                    >
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for editing event */}
        {/* Modal for editing event */}
        {showModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Modifier l'Événement
              </h3>
              <form className="space-y-4">
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    defaultValue={selectedEvent.title}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Stade Input */}
                <div>
                  <label
                    htmlFor="stade"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Stade
                  </label>
                  <input
                    type="text"
                    id="stade"
                    defaultValue={selectedEvent.stade}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Places Input */}
                <div>
                  <label
                    htmlFor="places"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Nombre de Places
                  </label>
                  <input
                    type="number"
                    id="places"
                    defaultValue={selectedEvent.places}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Category Input */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Catégorie
                  </label>
                  <input
                    type="text"
                    id="category"
                    defaultValue={selectedEvent.category}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Image Preview */}
                <div className="mt-4">
                  <img
                    src={selectedEvent.image.url}
                    alt={selectedEvent.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    onClick={handleCloseModal}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListEvenements;
