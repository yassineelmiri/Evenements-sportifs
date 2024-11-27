import React, { useState, useEffect } from "react";
import Sidebare from '../../components/Sidebare';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { fetchEvenment } from "../../redux/apiCalls/evenmentCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendar, faDollarSign } from "@fortawesome/free-solid-svg-icons";

const Statistique = () => {
  const dispatch = useDispatch();
  const evenments = useSelector((state) => state.evenment.evenments);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchEvenment(1));
  }, [dispatch]);

  useEffect(() => {
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

  return (
    <div className="flex min-h-screen bg-gray-800">
      {/* Sidebar */}
      <Sidebare />
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faUsers} className="text-3xl text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
            </div>
            <p className="text-4xl text-purple-600 mt-2">{users.length}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faCalendar} className="text-3xl text-green-600" />
              <h2 className="text-xl font-semibold text-gray-700">Evenements</h2>
            </div>
            <p className="text-4xl text-green-600 mt-2">{evenments.length}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} className="text-3xl text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-700">Revenue</h2>
            </div>
            <p className="text-4xl text-yellow-600 mt-2">{evenments.length * 12},00Dhs</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3 transform hover:scale-95 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-700">Recent Activity</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-gray-600">User JohnDoe added a new post.</span>
                <span className="text-sm text-gray-500">2 mins ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">Admin updated the settings.</span>
                <span className="text-sm text-gray-500">15 mins ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-600">User Alice uploaded a new file.</span>
                <span className="text-sm text-gray-500">30 mins ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistique;
