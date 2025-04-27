import { useState } from "react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styled from "styled-components";
import {
  FaHome,
  FaUsers,
  FaList,
  FaClipboardList,
  FaFolder,
  FaCubes,
  FaBriefcase,
  FaBuilding,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

const SidebarContainer = styled.aside`
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--color-surface);
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-normal);
  display: flex;
  flex-direction: column;
  z-index: 100;

  @media (max-width: 768px) {
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const Logo = styled.div`
  padding: var(--space-6) var(--space-4);
  border-bottom: 1px solid var(--color-secondary-200);

  h1 {
    font-size: 1.5rem;
    color: var(--color-primary-600);
    margin: 0;
  }
`;

const NavMenu = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) 0;
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  flex: ${(props) => (props.$isMain ? "1" : "initial")};
  padding-bottom: ${(props) => (props.$isMain ? "var(--space-4)" : "0")};
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  color: var(--color-secondary-700);
  transition: all var(--transition-fast);
  font-weight: 500;
  position: relative;

  &:hover {
    background-color: var(--color-secondary-50);
    color: var(--color-primary-600);
  }

  &.active {
    color: var(--color-primary-600);
    background-color: var(--color-primary-50);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--color-primary-600);
    }
  }

  svg {
    margin-right: var(--space-3);
    font-size: 1.2rem;
  }
`;

const UserProfile = styled.div`
  padding: var(--space-4);
  border-top: 1px solid var(--color-secondary-200);
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: var(--space-3);
`;

const UserInfo = styled.div`
  flex: 1;

  h3 {
    font-size: 0.9rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.8rem;
    color: var(--color-secondary-500);
    margin: 0;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-secondary-500);
  cursor: pointer;
  transition: color var(--transition-fast);
  padding: var(--space-1);

  &:hover {
    color: var(--color-error-500);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ToggleSidebar = styled.button`
  position: fixed;
  top: var(--space-4);
  left: ${(props) =>
    props.$isOpen
      ? "calc(var(--sidebar-width) - var(--space-4))"
      : "var(--space-4)"};
  z-index: 110;
  background-color: var(--color-primary-600);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: left var(--transition-normal);
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  return (
    <>
      <ToggleSidebar $isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? "×" : "☰"}
      </ToggleSidebar>

      <SidebarContainer $isOpen={isOpen}>
        <Logo>
          <h1>ArquiTech</h1>
        </Logo>

        <NavMenu>
          <NavSection $isMain={true}>
            <MenuLink to="/dashboard" onClick={closeSidebar}>
              <FaHome /> Inicio
            </MenuLink>
            <MenuLink to="/employees" onClick={closeSidebar}>
              <FaUsers /> Empleados
            </MenuLink>
            <MenuLink to="/categories" onClick={closeSidebar}>
              <FaList /> Categorias
            </MenuLink>
            <MenuLink to="/daily-reports" onClick={closeSidebar}>
              <FaClipboardList /> Partes Diarios
            </MenuLink>
            <MenuLink to="/areas" onClick={closeSidebar}>
              <FaFolder /> Rubros
            </MenuLink>
            <MenuLink to="/concrete-composition" onClick={closeSidebar}>
              <FaCubes /> Composicion Hormigon
            </MenuLink>
            <MenuLink to="/masonry-composition" onClick={closeSidebar}>
              <FaBriefcase /> Composición Albañileria
            </MenuLink>
            <MenuLink to="/price-list" onClick={closeSidebar}>
              <FaList /> Listado de Precios
            </MenuLink>
          </NavSection>

          {user?.role === "admin" && (
            <NavSection>
              <MenuLink to="/users" onClick={closeSidebar}>
                <FaUserCog /> Usuarios
              </MenuLink>
              <MenuLink to="/projects" onClick={closeSidebar}>
                <FaBuilding /> Obras
              </MenuLink>
            </NavSection>
          )}
        </NavMenu>

        <UserProfile>
          <UserAvatar>{getInitials(user?.name)}</UserAvatar>
          <UserInfo>
            <h3>{user?.name || "Usuario"}</h3>
            <p>{user?.role === "admin" ? "Administrador" : "Usuario"}</p>
          </UserInfo>
          <LogoutButton onClick={logout} title="Cerrar sesión">
            <FaSignOutAlt />
          </LogoutButton>
        </UserProfile>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
