import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, Briefcase } from "lucide-react";
import { clearAllUserErrors, logout } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

export default function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, message, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
        className: "bg-red-600 text-white border border-red-700",
      });
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast({
        variant: "success",
        title: "Success",
        description: message,
        className: "bg-green-600 text-white border border-green-700",
      });
    }
  }, [isAuthenticated, error, message, dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    if (!isAuthenticated) {
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-black bg-opacity-50 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
        >
          <Briefcase className="w-8 h-8 mr-2" />
          JobPortal
        </Link>
        <nav className="hidden md:flex space-x-4">
          <NavLinks handleLogout={handleLogout} />
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black shadow-lg">
          <nav className="px-4 pt-2 pb-4 flex flex-col space-y-2">
            <NavLinks
              onClick={() => setIsMenuOpen(false)}
              handleLogout={handleLogout}
            />
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLinks({ onClick, handleLogout }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const employer = user.role === "Employer" ? true : false;

  return (
    <>
      <Link
        to="/jobs"
        onClick={onClick}
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Jobs
      </Link>
      {isAuthenticated && employer && (
        <Link
          to="/post-job"
          onClick={onClick}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Post Job
        </Link>
      )}
      {isAuthenticated && !employer && (
        <Link
          to="/applications"
          onClick={onClick}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Applications
        </Link>
      )}
      {isAuthenticated && (
        <Link
          to="/profile"
          onClick={onClick}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Profile
        </Link>
      )}
      {isAuthenticated && employer && (
        <Link
          to="/myjobs"
          onClick={onClick}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          My Jobs
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          to="/auth"
          onClick={onClick}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Login
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          to="/auth"
          onClick={onClick}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          SignUp
        </Link>
      )}
      {isAuthenticated && (
        <Link
          to="/logout"
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Logout
        </Link>
      )}
    </>
  );
}
