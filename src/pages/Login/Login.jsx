import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-50);
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-8);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: var(--space-6);
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: var(--space-6);

  h1 {
    font-size: 2rem;
    color: var(--color-primary-600);
    margin-bottom: var(--space-2);
  }

  p {
    color: var(--color-secondary-500);
    margin-bottom: var(--space-6);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorAlert = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error-500);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
  font-size: 0.9rem;
  border-left: 3px solid var(--color-error-500);
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }

    const success = await login(username, password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <h1>ArquiTech</h1>
          <p>Sistema de Gestión</p>
        </Logo>

        {error && <ErrorAlert>{error}</ErrorAlert>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Ingrese su usuario"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError();
            }}
            required
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
            }}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "var(--space-4)" }}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
