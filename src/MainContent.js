// MainContent.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./view/partials/Home";
import SignIn from "./Components/googleSignIn/signIn";
import Update from "./view/account/Update";
import Admin from "./view/admin/Admin";
import Manager from "./view/manager/Manager";
import Pet from "./view/pet/Pet";
import AddPet from "./view/pet/AddPet";
import PetDetail from "./view/pet/PetDetail";
import Book from "./view/booking/Book";
import QrCodePage from "./view/qr/QrCodePage";
import Transaction from "./Components/transaction/TransactionHistory";
import ForgotPassword from "./Components/googleSignIn/ForgotPassword";
import ManageBooking from "./view/booking/ManageBooking";
import BookingDetails from "./view/booking/BookingDetails";
import Header from "./view/partials/Header";
import Footer from "./view/partials/Footer";
import { auth } from "./Components/firebase/firebase";
import "./App.css";

function MainContent() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    const handleLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    handleLoading();

    return () => {
      unsubscribe();
    };
  }, [location.pathname]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <div className="App">
      {loading && (
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {!loading && (
        <>
          <Header user={user} currentPath={currentPath} />
          <div className="content">
            <Routes>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Update user={user} />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/pet" element={<Pet />} />
              <Route path="/pet/add" element={<AddPet />} />
              <Route path="/book" element={<Book />} />
              <Route path="/qr" element={<QrCodePage />} />
              <Route path="/transaction-history" element={<Transaction />} />
              <Route path="/reset" element={<ForgotPassword />} />
              <Route path="/manage-booking" element={<ManageBooking />} />
              <Route path="/booking-details/:bookingId" element={<BookingDetails />} />
              <Route path="/pet-details/:petId" element={<PetDetail />} />
            </Routes>
          </div>
          <Footer currentPath={currentPath} />
        </>
      )}
    </div>
  );
}

export default MainContent;
