import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

const images = [
  require("../../assets/images/full-slider/2.jpg"),
  require("../../assets/images/full-slider/3.jpg"),
  require("../../assets/images/full-slider/4.jpg"),
  require("../../assets/images/full-slider/5.jpg"),
  require("../../assets/images/full-slider/6.jpg"),
];

const Home = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold">RS SPORTS</div>
          <div className="hidden md:flex space-x-6">
            {userInfo ? (
              <button
                onClick={handleLogout}
                className="py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded-lg transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="py-2 px-4 text-white bg-yellow-600 hover:bg-yellow-500 rounded-lg transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button id="menu-btn" className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Slider */}
      <div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-screen"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {userInfo ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div className="text-center text-white">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      Loading Tick
                        <span className="text-yellow-500">et...</span>
                      </h1>
                      <div className="flex justify-center space-x-4">
                        <button className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600">
                          READ MORE
                        </button>
                        <Link
                          to="/signin"
                          className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 hover:text-black transition duration-200"
                        >
                          Imprimer List
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <div  className="text-center text-white">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Evénements Sporti
                        <span className="text-yellow-500">fs</span>
                      </h1>
                      <div className="flex justify-center space-x-4">
                        <button className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600">
                          READ MORE
                        </button>
                        <Link
                          to="/signin"
                          className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-6 py-2 rounded hover:bg-yellow-600 hover:text-black transition duration-200"
                        >
                          BOOK A TICKET
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
