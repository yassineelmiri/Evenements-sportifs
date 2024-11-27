import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Statistique from "./pages/Dashboard/Statistique";
import Resetpassword from "./pages/Auth/Resetpassword";
import VerifyEmail from "./pages/Auth/verifyemail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./pages/NotFound/error";
import CreateEvenements from "./pages/Dashboard/Creation/CreateEvenements";
import ListEvenements from "./pages/Dashboard/Liste/ListEvenements";
import CreateInscriptions from "./pages/Dashboard/Creation/CreateInscriptions";
import Index from "./pages/Home/index.jsx";
import ListeParticipants from "./pages/Dashboard/Liste/ListeParticipants.jsx";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/user/:userId/verify/:token" element={<VerifyEmail />} />

        {/* //organisateur */}
        <Route
          path="/Statistique"
          element={user.isAdmin ? <Statistique /> : <Index />}
        />

        <Route
          path="/CreateEvenements"
          element={user?.isAdmin ? <CreateEvenements /> : <Index />}
        />
        <Route
          path="/CreateInscriptions"
          element={user?.isAdmin ? <CreateInscriptions /> : <Index />}
        />

        <Route
          path="/ListEvenements"
          element={user?.isAdmin ? <ListEvenements /> : <Index />}
        />
        <Route
          path="/ListParticipants"
          element={user?.isAdmin ? <ListeParticipants /> : <Index />}
        />

        <Route path="/" element={<Index />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
