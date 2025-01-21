import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { ThemeProvider } from "./Context/Theme";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import ThemeBtn from "../src/components/Header/ThemeBtn";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  // actual change in theme
  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <div className="flex flex-wrap dark:bg-[#424245] dark:text-gray-200 content-between bg-white">
        <div className="lg:w-full block">
          <Header className="dark:bg-[#424245] dark:text-gray-20" />
          <main className="">
            <Outlet />
            
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  ) : null;
}

export default App;
