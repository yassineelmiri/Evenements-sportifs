import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants, deleteParticipantById } from "../../../redux/apiCalls/participantsApiCall";
import Sidebare from "../../../components/Sidebare";
// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPrint } from "@fortawesome/free-solid-svg-icons";

const ListeParticipants = () => {
  const dispatch = useDispatch();

  // Récupération des données depuis le Redux store
  const { participants, loading, error } = useSelector((state) => state.participants);

  // Charger les participants lors du chargement du composant
  useEffect(() => {
    dispatch(fetchParticipants());
  }, [dispatch]);

  // Fonction pour supprimer un participant
  const handleDelete = (participantId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce participant ?")) {
      dispatch(deleteParticipantById(participantId));
    }
  };
console.log(participants);

  // Fonction pour imprimer les détails d'un participant
  const handlePrint = (participant) => {
    // Générer les lignes du tableau pour les participants
    const participantsTableRows = participant.participants
      .map(
        (participantName, index) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${participantName}</td>
        </tr>`
      )
      .join("");
  
    const printContent = `
      <html>
        <head>
          <title>Détails du Participant</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #000;
            }
            .card {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid #ddd;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              padding: 20px;
              text-align: center;
            }
            .card img {
              max-width: 100%;
              border-radius: 8px;
              margin-bottom: 15px;
            }
            .card h2 {
              font-size: 24px;
              margin-bottom: 10px;
              color: #333;
            }
            .card p {
              font-size: 16px;
              color: #555;
              margin: 5px 0;
            }
            .card .info {
              margin-top: 20px;
              text-align: left;
            }
            .card .info p {
              margin: 8px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table th, table td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            table th {
              background-color: #f4f4f9;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <div class="card">
            ${
              participant.evenments.image.url
                ? `<img src="${participant.evenments.image.url}" alt="Événement Image" />`
                : `<img src="https://via.placeholder.com/600x400?text=Pas+de+Image" alt="Pas de Image" />`
            }
            <h2>Détails du Participant</h2>
            <div class="info">
              <p><strong>ID :</strong> ${participant._id}</p>
              <p><strong>Événement :</strong> ${participant.evenments.title || "Non spécifié"}</p>
              <p><strong>Catégorie :</strong> ${participant.evenments.category || "Non spécifiée"}</p>
              <p><strong>Lieu :</strong> ${participant.evenments.stade || "Non spécifié"}</p>
              <p><strong>Places Disponibles :</strong> ${participant.evenments.places || "Non spécifiées"}</p>
              
              <h3>Liste des Participants</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID Auto</th>
                    <th>Nom</th>
                  </tr>
                </thead>
                <tbody>
                  ${participantsTableRows}
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    `;
  
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  
  

  return (
    <div className="flex h-screen">
      <Sidebare />
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-800 overflow-auto">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Liste des Participants</h2>
          </div>

          {loading ? (
            <div className="text-center text-gray-700 dark:text-gray-200">Chargement des participants...</div>
          ) : error ? (
            <div className="text-red-500">Erreur : {error}</div>
          ) : (
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Événement</th>
                    <th className="py-3 px-4 text-left">Participants</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant._id} className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-3 px-4">{participant._id}</td>
                      <td className="py-3 px-4">{participant.evenments.title || "Non spécifié"}</td>
                      <td className="py-3 px-4">{participant.participants.join(", ")}</td>
                      <td className="py-3 px-4 flex space-x-4">
                        <button
                          onClick={() => handleDelete(participant._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Supprimer"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => handlePrint(participant)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Imprimer"
                        >
                          <FontAwesomeIcon icon={faPrint} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListeParticipants;
