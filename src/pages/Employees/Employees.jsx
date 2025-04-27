import styled from "styled-components";
import Card from "../../components/UI/Card";
import React from "react";
import Button from "../../components/UI/Button";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

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

const Table = styled.div`
  overflow-x: auto;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: var(--space-4);
    text-align: left;
    border-bottom: 1px solid var(--color-secondary-200);
  }

  th {
    background-color: var(--color-secondary-50);
    font-weight: 600;
    color: var(--color-secondary-700);
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: var(--color-secondary-50);
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--space-8) var(--space-4);
  color: var(--color-secondary-500);
`;

function Employees() {
  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: "Juan Pérez",
      category: "Albañil",
      phone: "1234567890",
      email: "juan@example.com",
      active: true,
    },
    {
      id: 2,
      name: "María González",
      category: "Electricista",
      phone: "0987654321",
      email: "maria@example.com",
      active: true,
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      category: "Plomero",
      phone: "5678901234",
      email: "carlos@example.com",
      active: false,
    },
    {
      id: 4,
      name: "Ana Martínez",
      category: "Pintora",
      phone: "3456789012",
      email: "ana@example.com",
      active: true,
    },
    {
      id: 5,
      name: "Roberto Fernández",
      category: "Carpintero",
      phone: "6789012345",
      email: "roberto@example.com",
      active: true,
    },
  ];

  return (
    <div className="fade-in">
      <PageHeader>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Buscar empleado..." />
        </SearchBar>

        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nuevo Empleado
        </Button>
      </PageHeader>

      <Table>
        <StyledTable>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="slide-in">
                  <td>{employee.name}</td>
                  <td>{employee.category}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        backgroundColor: employee.active
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(239, 68, 68, 0.1)",
                        color: employee.active
                          ? "var(--color-success-500)"
                          : "var(--color-error-500)",
                      }}
                    >
                      {employee.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="actions">
                    <Button variant="ghost" size="sm" title="Editar">
                      <FaEdit />
                    </Button>
                    <Button variant="ghost" size="sm" title="Eliminar">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <EmptyState>No hay empleados registrados.</EmptyState>
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </Table>
    </div>
  );
}

export default Employees;
