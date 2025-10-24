import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Backend/useAuth";

export const PublicRoutes = ({ children }) => {
  const {currentUser} = useAuth();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/"); 
    }
  }, [currentUser, navigate]);

  return !currentUser ? children : null;
};
