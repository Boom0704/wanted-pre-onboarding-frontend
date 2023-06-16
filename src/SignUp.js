import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/todo");
    }
  }, []);
  

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post(
          "https://www.pre-onboarding-selection-task.shop/auth/signup",
          {
            email,
            password,
          }
        );
        navigate('/signin');
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type="email"
          placeholder="sunday@gmail.com"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="8자리 이상 비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isFormValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default App;
