import * as React from "react";
import s from "./Unauthenticated.module.css";
import { useAuth } from "../../contexts/authContext";
import Button from "../Button/Button";

function Unauthenticated() {
  const { login, signup } = useAuth();

  const [status, setStatus] = React.useState("idle");
  const [activeTab, setActiveTab] = React.useState("login");
  const [signUpErrors, setSignUpErrors] = React.useState(null);

  const [formData, setFormData] = React.useState({
    email:"",
    password:"",
  })

  const [ showPassword, setShowPassword ] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    // obtener datos del formulario desde el estado
    const { email, password } = formData;
    
    setStatus("loading");

    if (activeTab === "login") {
      login(email, password)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    } else {
      signup(email, password)
        .then(() => setStatus("success"))
        .catch((error) => {
          setStatus("error");
          setSignUpErrors(error.message);
        });
    }
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setStatus("idle");
    setFormData({ email: "", password: "" });
    setSignUpErrors(null);
  }

  const togglePasswordButton = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  };

  const isLoading = status === "loading";
  const buttonText = activeTab === "login" ? "Login" : "Create";
  const hasError = status === "error";

  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <button
          onClick={() => handleTabChange("login")}
          className={activeTab === "login" ? s.active : ""}
        >
          Login
        </button>
        <button
          onClick={() => handleTabChange("signup")}
          className={activeTab === "signup" ? s.active : ""}
        >
          Signup
        </button>
      </div>
      <form onSubmit={handleSubmit} className={s.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className={s.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className={s.passwordInput}
          />
          <button
          type="button"
          onClick={togglePasswordButton}
          className={s.showPasswordButton}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </form>
      {hasError && (
        <p className={s["error-message"]}>
          {signUpErrors || "Invalid Credentials"}
        </p>
      )}
    </div>
  );
}

export default Unauthenticated;
