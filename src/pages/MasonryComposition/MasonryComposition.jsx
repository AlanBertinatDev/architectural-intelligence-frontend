import styled from "styled-components";
import React from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
`;

const CompositionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
`;

const CompositionCard = styled(Card)`
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .title {
    font-size: 1.2rem;
    margin: 0;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: var(--space-3);
    text-align: left;
    border-bottom: 1px solid var(--color-secondary-200);
  }

  th {
    font-weight: 600;
    color: var(--color-secondary-700);
    font-size: 0.9rem;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .material-name {
    font-weight: 500;
  }

  .quantity {
    text-align: right;
  }

  .unit {
    text-align: center;
    color: var(--color-secondary-500);
  }
`;

const CompositionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-secondary-200);
  font-size: 0.9rem;
  color: var(--color-secondary-500);
`;

function MasonryComposition() {
  // Mock data for masonry compositions
  const compositions = [
    {
      id: 1,
      name: "Mortero de asiento 1:3",
      description:
        "Mortero para asentamiento de ladrillos, bloques y mampuestos",
      yieldPerM3: "1.0 m³",
      lastUpdated: "2023-10-05",
      materials: [
        { id: 1, name: "Cemento Portland", quantity: 450, unit: "kg" },
        { id: 2, name: "Arena Fina", quantity: 1350, unit: "kg" },
        { id: 3, name: "Agua", quantity: 225, unit: "lts" },
      ],
    },
    {
      id: 2,
      name: "Mortero de revoque grueso 1:1/4:3",
      description: "Mortero para revoque grueso interior o exterior",
      yieldPerM3: "1.0 m³",
      lastUpdated: "2023-09-28",
      materials: [
        { id: 1, name: "Cemento Portland", quantity: 350, unit: "kg" },
        { id: 2, name: "Cal Hidratada", quantity: 87.5, unit: "kg" },
        { id: 3, name: "Arena Gruesa", quantity: 1050, unit: "kg" },
        { id: 4, name: "Agua", quantity: 280, unit: "lts" },
      ],
    },
    {
      id: 3,
      name: "Mortero de revoque fino 1:1/2:2",
      description: "Mortero para revoque fino interior o exterior",
      yieldPerM3: "1.0 m³",
      lastUpdated: "2023-09-28",
      materials: [
        { id: 1, name: "Cemento Portland", quantity: 450, unit: "kg" },
        { id: 2, name: "Cal Hidratada", quantity: 225, unit: "kg" },
        { id: 3, name: "Arena Fina", quantity: 900, unit: "kg" },
        { id: 4, name: "Agua", quantity: 270, unit: "lts" },
      ],
    },
  ];

  return (
    <div className="fade-in">
      <PageHeader>
        <h2>Composición de Albañilería</h2>
        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nueva Composición
        </Button>
      </PageHeader>

      <CompositionsContainer>
        {compositions.map((composition) => (
          <CompositionCard key={composition.id} className="scale-in">
            <div className="card-header">
              <h3 className="title">{composition.name}</h3>
              <div className="actions">
                <Button variant="ghost" size="sm" title="Editar">
                  <FaEdit />
                </Button>
                <Button variant="ghost" size="sm" title="Eliminar">
                  <FaTrash />
                </Button>
              </div>
            </div>

            <p>{composition.description}</p>

            <Table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th className="quantity">Cantidad</th>
                  <th className="unit">Unidad</th>
                </tr>
              </thead>
              <tbody>
                {composition.materials.map((material) => (
                  <tr key={material.id}>
                    <td className="material-name">{material.name}</td>
                    <td className="quantity">{material.quantity}</td>
                    <td className="unit">{material.unit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <CompositionMeta>
              <span>Rendimiento: {composition.yieldPerM3}</span>
              <span>
                Última actualización:{" "}
                {new Date(composition.lastUpdated).toLocaleDateString()}
              </span>
            </CompositionMeta>
          </CompositionCard>
        ))}
      </CompositionsContainer>
    </div>
  );
}

export default MasonryComposition;
