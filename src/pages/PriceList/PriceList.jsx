import styled from "styled-components";
import React from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaDownload } from "react-icons/fa";

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

const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-2);
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

  .price {
    text-align: right;
    font-weight: 500;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }
`;

function PriceList() {
  // Mock data for price list
  const prices = [
    {
      id: 1,
      code: "MAT-001",
      name: "Cemento Portland",
      unit: "Bolsa 50kg",
      price: 5500,
      category: "Material",
      lastUpdated: "2023-11-10",
    },
    {
      id: 2,
      code: "MAT-002",
      name: "Arena Fina",
      unit: "m³",
      price: 18000,
      category: "Material",
      lastUpdated: "2023-11-05",
    },
    {
      id: 3,
      code: "MAT-003",
      name: "Ladrillo Hueco 18x18x33",
      unit: "un",
      price: 550,
      category: "Material",
      lastUpdated: "2023-11-05",
    },
    {
      id: 4,
      code: "MAT-004",
      name: "Hierro Ø 10mm",
      unit: "Barra 12m",
      price: 9800,
      category: "Material",
      lastUpdated: "2023-11-08",
    },
    {
      id: 5,
      code: "MAT-005",
      name: "Membrana Asfáltica 4mm",
      unit: "Rollo 10m²",
      price: 22000,
      category: "Material",
      lastUpdated: "2023-11-10",
    },
    {
      id: 6,
      code: "MO-001",
      name: "Albañil",
      unit: "Hora",
      price: 1500,
      category: "Mano de Obra",
      lastUpdated: "2023-10-15",
    },
    {
      id: 7,
      code: "MO-002",
      name: "Ayudante",
      unit: "Hora",
      price: 1100,
      category: "Mano de Obra",
      lastUpdated: "2023-10-15",
    },
    {
      id: 8,
      code: "MO-003",
      name: "Electricista",
      unit: "Hora",
      price: 1800,
      category: "Mano de Obra",
      lastUpdated: "2023-10-15",
    },
  ];

  return (
    <div className="fade-in">
      <PageHeader>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Buscar por código o nombre..." />
        </SearchBar>

        <ActionButtons>
          <Button variant="outline" iconPosition="left">
            <FaDownload /> Exportar
          </Button>
          <Button variant="primary" iconPosition="left">
            <FaPlus /> Nuevo Precio
          </Button>
        </ActionButtons>
      </PageHeader>

      <Table>
        <StyledTable>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Unidad</th>
              <th>Categoría</th>
              <th className="price">Precio</th>
              <th>Actualizado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item) => (
              <tr key={item.id} className="slide-in">
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.category}</td>
                <td className="price">${item.price.toLocaleString()}</td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                <td className="actions">
                  <Button variant="ghost" size="sm" title="Editar">
                    <FaEdit />
                  </Button>
                  <Button variant="ghost" size="sm" title="Eliminar">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Table>
    </div>
  );
}

export default PriceList;
