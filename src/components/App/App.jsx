import clsx from "clsx";
import s from "./App.module.css";
import Home from "../Home";
import ColorGame from "../ColorGame";
import Doable from "../Doable";
import { AuthProvider } from "../../contexts/authContext";

import reactIconUrl from "../../assets/react-icon.svg";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
      <div className={s.wrapper}>
        <header className={s.header}>
          <Link to="/" className={s.logo}>
            <img src={reactIconUrl} /> React Evaluation
          </Link>
          <nav className={s.nav}>
            <Link
              to="/color-game"
              className={clsx(
                s["nav-item"],
                location.pathname === "/color-game" && s.current
              )}
            >
              Color Game
            </Link>
            <Link
              to="/doable"
              className={clsx(
                s["nav-item"],
                location.pathname === "/doable" && s.current
              )}
            >
              Doable
            </Link>
          </nav>
        </header>
        <main className={s.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/color-game" element={<ColorGame />} />
            <Route
              path="/doable"
              element={
                <AuthProvider>
                  <Doable />
                </AuthProvider>
              }
            />
          </Routes>
        </main>
      </div>
  );
}

function BrowserApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default BrowserApp; 


