import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCalendarPlus,
  faUserPlus,
  faList,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";


const Sidebare = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Récupérer les données de l'utilisateur depuis localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  // Gérer l'affichage du popup avec les informations de l'utilisateur
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div className="w-64 bg-gray-900 flex flex-col justify-between text-white p-6">
      <nav className="mt-8">
        {/* Afficher la photo et le nom de l'utilisateur */}
        {userInfo && (
          <>
            <div
              className="flex items-center cursor-pointer"
              onClick={togglePopup}
            >
              <img
                src={userInfo.profilePhoto.url}
                alt="Profil"
                className="w-14 h-14 object-cover rounded-full border-2 border-gray-600 mr-4"
              />

              <span className="text-white">{userInfo.username}</span>
            </div>

            {/* Affichage du popup avec les informations personnelles */}
            {showPopup && (
              <div className="absolute bg-gray-900 text-white p-6 rounded-lg shadow-lg w-72 mt-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <img
                    src={userInfo.profilePhoto.url}
                    alt="Profil"
                    className="w-14 h-14 object-cover rounded-full border-2 border-gray-600 mr-4"
                  />

                  <div>
                    <h3 className="text-lg font-bold">
                      Informations personnelles
                    </h3>
                  </div>
                </div>
                <div className="text-sm space-y-2">
                  <p>
                    <strong className="font-semibold text-gray-400">
                      Nom d'utilisateur:
                    </strong>{" "}
                    {userInfo.username}
                  </p>
                  <p>
                    <strong className="font-semibold text-gray-400">
                      Administrateur:
                    </strong>{" "}
                    <span
                      className={
                        userInfo.isAdmin ? "text-green-400" : "text-red-400"
                      }
                    >
                      {userInfo.isAdmin ? "Oui" : "Non"}
                    </span>
                  </p>
                  <p>
                    <strong className="font-semibold text-gray-400">
                      Date de création:
                    </strong>{" "}
                    {new Date(userInfo.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    <strong className="font-semibold text-gray-400">
                      Dernière mise à jour:
                    </strong>{" "}
                    {new Date(userInfo.updatedAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

<ul className="mt-4 space-y-2">
          <li>
            <Link
              to="/Statistique"
              className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-3" />
              Statistique
            </Link>
          </li>
          <li>
            <Link
              to="/CreateEvenements"
              className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faCalendarPlus} className="mr-3" />
              Create Evenements
            </Link>
          </li>
          <li>
            <Link
              to="/CreateInscriptions"
              className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
              Create Inscriptions
            </Link>
          </li>
          <li>
            <Link
              to="/ListEvenements"
              className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faList} className="mr-3" />
              Liste des événements
            </Link>
          </li>
          <li>
            <Link
              to="/ListParticipants"
              className="flex items-center py-2 px-4 text-white hover:bg-purple-600 rounded-lg transition duration-200"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Liste des Participants
            </Link>
          </li>
        </ul>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 flex items-center justify-center w-full py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded-lg transition duration-200"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default Sidebare;