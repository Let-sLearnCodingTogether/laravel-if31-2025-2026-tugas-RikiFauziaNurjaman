import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    if (userData) setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.avatar || "Tidak Ada Avatar"}
          alt="Avatar"
          className="w-8 h-8 rounded-full border border-white"
        />
        <span className="hidden sm:inline">{user?.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-10 border border-gray-100">
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profil
          </button>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
