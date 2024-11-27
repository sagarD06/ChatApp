import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { setUser } = useAuthContext();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signout"
      );
      if (response.data.success) {
        localStorage.removeItem("chat-user");
        setUser(null);
        toast.success("You've been logged out.");
      }
    } catch (error) {
      toast.error("Failed to log out");
    }
  };
  return (
    <div className="mt-auto">
      <BiLogOut
        className="w-10 h-10 mb-2 text-dark cursor-pointer"
        onClick={handleLogout}
      />
    </div>
  );
};

export default LogoutButton;
