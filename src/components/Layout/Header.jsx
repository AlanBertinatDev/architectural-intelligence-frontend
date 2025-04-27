import { useState, useEffect } from "react";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  height: var(--header-height);
  background-color: var(--color-surface);
  position: fixed;
  top: 0;
  right: 0;
  left: var(--sidebar-width);
  display: flex;
  align-items: center;
  padding: 0 var(--space-6);
  box-shadow: var(--shadow-sm);
  z-index: 50;
  transition: left var(--transition-normal);

  @media (max-width: 768px) {
    left: 0;
    padding: 0 var(--space-4);
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-secondary-900);
`;

const CompanyName = styled.div`
  margin-left: auto;
  font-weight: 600;
  color: var(--color-primary-600);
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

function Header() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const path = location.pathname;

    // Set page title based on current route
    switch (true) {
      case path.includes("/dashboard"):
        setPageTitle("Panel Principal");
        break;
      case path.includes("/employees"):
        setPageTitle("Gestión de Empleados");
        break;
      case path.includes("/categories"):
        setPageTitle("Categorías");
        break;
      case path.includes("/daily-reports"):
        setPageTitle("Partes Diarios");
        break;
      case path.includes("/areas"):
        setPageTitle("Rubros");
        break;
      case path.includes("/concrete-composition"):
        setPageTitle("Composición de Hormigón");
        break;
      case path.includes("/masonry-composition"):
        setPageTitle("Composición de Albañilería");
        break;
      case path.includes("/price-list"):
        setPageTitle("Listado de Precios");
        break;
      case path.includes("/users"):
        setPageTitle("Gestión de Usuarios");
        break;
      case path.includes("/projects"):
        setPageTitle("Gestión de Obras");
        break;
      default:
        setPageTitle("Panel de Control");
    }
  }, [location]);

  return (
    <HeaderContainer>
      <PageTitle className="fade-in">{pageTitle}</PageTitle>
      <CompanyName>ArquiTech S.A.</CompanyName>
    </HeaderContainer>
  );
}

export default Header;
