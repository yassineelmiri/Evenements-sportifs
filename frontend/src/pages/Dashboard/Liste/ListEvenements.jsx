import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvenment,
  deleteEvenment,
  updateEvenments,
} from "../../../redux/apiCalls/evenmentCall";
import Sidebare from "../../../components/Sidebare";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

const ListEvenements = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [stade, setStade] = useState("");
  const [category, setCategory] = useState("");
  const evenments = useSelector((state) => state.evenment.evenments);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Charger les événements et le mode sombre au montage du composant
  useEffect(() => {
    dispatch(fetchEvenment(1));
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, [dispatch]);

  // Sauvegarder le mode sombre dans le localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Remplir le formulaire lorsque l'événement sélectionné change
  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || "");
      setStade(selectedEvent.stade || "");
      setCategory(selectedEvent.category || "");
    }
  }, [selectedEvent]);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      dispatch(deleteEvenment(id)).then(() => {
        toast.success("Événement supprimé avec succès !");
      });
      dispatch(fetchEvenment(1));
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

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!title || !stade || !category) {
      toast.error("Tous les champs sont obligatoires !");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("stade", stade);
    formData.append("category", category);

    try {
      await dispatch(updateEvenments(selectedEvent._id, formData));
      toast.success("Événement mis à jour avec succès !");
      dispatch(fetchEvenment(1));
      handleCloseModal();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour de l'événement.");
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebare />
      <ToastContainer />
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
                      key={event._id}
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
                      Aucun événement trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal pour modification */}
        {showModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                ✕
              </button>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                Modifier l'Événement
              </h3>
              <form onSubmit={handleSubmitEdit} className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stade"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Stade
                  </label>
                  <input
                    type="text"
                    id="stade"
                    value={stade}
                    onChange={(e) => setStade(e.target.value)}
                    className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Catégorie
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Rugby">Rugby</option>
                    <option value="Natation">Natation</option>
                  </select>
                </div>
                <div className="mt-4">
                  <img
                    src={selectedEvent?.image?.url}
                    alt={selectedEvent?.title}
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="py-2 px-6 rounded-lg border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={handleCloseModal}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
