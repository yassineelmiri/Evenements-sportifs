import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Sidebare from "../../../components/Sidebare";
import { useDispatch } from "react-redux";
import { createEvenment } from "../../../redux/apiCalls/evenmentCall";

const CreateEvenements = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [places, setPlaces] = useState("");
  const [stade, setStade] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImage(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !places || !stade || !date || !category || !file) {
      toast.error("Tous les champs sont obligatoires !", {
        position: "top-right",
      });
      return;
    }
  
    if (stade.length < 5) {
      toast.error("Le nom du stade doit comporter au moins 5 caractères.", {
        position: "top-right",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("places", parseInt(places));
    formData.append("stade", stade);
    formData.append("horaire", date);
    formData.append("category", category);
    formData.append("image", file);
  
    try {
      const response = await dispatch(createEvenment(formData));
      if (response) {
        toast.success("Événement ajouté avec succès !", {
          position: "top-right",
        });
  
        // Réinitialiser le formulaire
        setTitle("");
        setPlaces("");
        setStade("");
        setImage("");
        setDate("");
        setCategory("");
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de l'ajout de l'événement.", {
        position: "top-right",
      });
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-800 text-white">
      <Sidebare />
      <ToastContainer />
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-gray-900 w-full max-w-lg p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-gray-300 mb-6 text-center">
            Ajouter un Événement Sportif
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Titre
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                placeholder="Entrez le titre de l'événement"
              />
            </div>
            <div>
              <label htmlFor="places" className="block text-sm font-medium text-gray-300">
                Nombre de places
              </label>
              <input
                type="number"
                id="places"
                value={places}
                onChange={(e) => setPlaces(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                placeholder="Entrez le nombre de places"
              />
            </div>

            <div>
              <label htmlFor="stade" className="block text-sm font-medium text-gray-300">
                Stade
              </label>
              <input
                type="text"
                id="stade"
                value={stade}
                onChange={(e) => setStade(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                placeholder="Entrez le nom du stade"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                Image
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              />
              {image && <img src={image} alt="Aperçu" className="mt-4 w-full h-40 object-cover" />}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                Date de l'événement
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                Catégorie
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Rugby">Rugby</option>
                <option value="Natation">Natation</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md"
              >
                Ajouter l'Événement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvenements;
