import styled from "styled-components";
import Card from "../../components/UI/Card";
import React from "react";
import Button from "../../components/UI/Button";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-4);
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-secondary-200);
  padding: var(--space-2) var(--space-4);
  width: 100%;
  max-width: 400px;
  transition: all var(--transition-fast);

  &:focus-within {
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }

  svg {
    color: var(--color-secondary-400);
    margin-right: var(--space-2);
  }

  input {
    border: none;
    background: transparent;
    flex: 1;
    padding: var(--space-1);
    outline: none;
    font-size: 0.95rem;

    &::placeholder {
      color: var(--color-secondary-400);
    }
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-4);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const UserCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: var(--space-3);

  ${(props) =>
    props.$isAdmin &&
    `
    background-color: rgba(245, 158, 11, 0.1);
    color: var(--color-warning-500);
  `}
`;

const UserInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 4px 0;
    font-size: 1.1rem;
  }

  .role {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${(props) =>
      props.$isAdmin
        ? "var(--color-warning-500)"
        : "var(--color-secondary-500)"};

    svg {
      margin-right: 4px;
      font-size: 0.8rem;
    }
  }
`;

const UserDetails = styled.div`
  margin-bottom: var(--space-4);
  font-size: 0.95rem;

  .detail-item {
    display: flex;
    margin-bottom: var(--space-2);

    .label {
      width: 100px;
      color: var(--color-secondary-500);
    }

    .value {
      flex: 1;
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-secondary-200);
`;

function Users() {
  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Carlos Gómez",
      email: "carlos@arquitectura.com",
      phone: "+54 11 5555-1234",
      role: "admin",
      lastLogin: "2023-11-15T10:30:00",
      createdDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Laura Fernández",
      email: "laura@arquitectura.com",
      phone: "+54 11 5555-5678",
      role: "user",
      lastLogin: "2023-11-14T16:45:00",
      createdDate: "2023-03-20",
    },
    {
      id: 3,
      name: "Martín Rodríguez",
      email: "martin@arquitectura.com",
      phone: "+54 11 5555-9012",
      role: "user",
      lastLogin: "2023-11-15T09:15:00",
      createdDate: "2023-05-10",
    },
    {
      id: 4,
      name: "Daniela López",
      email: "daniela@arquitectura.com",
      phone: "+54 11 5555-3456",
      role: "admin",
      lastLogin: "2023-11-13T14:20:00",
      createdDate: "2023-02-05",
    },
  ];

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="fade-in">
      <PageHeader>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Buscar usuario..." />
        </SearchBar>

        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nuevo Usuario
        </Button>
      </PageHeader>

      <UsersGrid>
        {users.map((user) => (
          <UserCard key={user.id} className="scale-in">
            <UserHeader>
              <UserAvatar $isAdmin={user.role === "admin"}>
                {getInitials(user.name)}
              </UserAvatar>
              <UserInfo $isAdmin={user.role === "admin"}>
                <h3>{user.name}</h3>
                <div className="role">
                  {user.role === "admin" ? (
                    <>
                      <FaUserShield /> Administrador
                    </>
                  ) : (
                    <>
                      <FaUser /> Usuario
                    </>
                  )}
                </div>
              </UserInfo>
            </UserHeader>

            <UserDetails>
              <div className="detail-item">
                <div className="label">Email:</div>
                <div className="value">{user.email}</div>
              </div>
              <div className="detail-item">
                <div className="label">Teléfono:</div>
                <div className="value">{user.phone}</div>
              </div>
              <div className="detail-item">
                <div className="label">Último acceso:</div>
                <div className="value">{formatDateTime(user.lastLogin)}</div>
              </div>
              <div className="detail-item">
                <div className="label">Creado:</div>
                <div className="value">
                  {new Date(user.createdDate).toLocaleDateString()}
                </div>
              </div>
            </UserDetails>

            <UserActions>
              <Button variant="outline" size="sm">
                Editar
              </Button>
              <Button variant="error" size="sm">
                Eliminar
              </Button>
            </UserActions>
          </UserCard>
        ))}
      </UsersGrid>
    </div>
  );
}

export default Users;
