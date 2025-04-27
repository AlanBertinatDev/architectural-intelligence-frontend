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

const AreasGrid = styled.div`
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

const AreaCard = styled(Card)`
  border-left: 4px solid
    ${(props) => props.$color || "var(--color-primary-500)"};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-secondary-900);
    margin: 0;
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }

  .content {
    color: var(--color-secondary-600);
  }

  .meta {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-secondary-200);
    font-size: 0.9rem;
    color: var(--color-secondary-500);
  }
`;

function Areas() {
  // Mock data for areas (rubros)
  const areas = [
    {
      id: 1,
      name: "Albañilería",
      code: "ALB-001",
      description: "Trabajos de mampostería, revoques, contrapisos.",
      projects: 8,
      color: "var(--color-primary-600)",
    },
    {
      id: 2,
      name: "Instalación Eléctrica",
      code: "ELE-001",
      description: "Cableado, tableros, bocas y artefactos de iluminación.",
      projects: 7,
      color: "var(--color-warning-500)",
    },
    {
      id: 3,
      name: "Instalación Sanitaria",
      code: "SAN-001",
      description: "Desagües, provisión de agua, artefactos sanitarios.",
      projects: 5,
      color: "var(--color-success-500)",
    },
    {
      id: 4,
      name: "Terminaciones",
      code: "TER-001",
      description: "Pintura, revestimientos, pisos, cielorrasos.",
      projects: 10,
      color: "#9333ea",
    },
    {
      id: 5,
      name: "Carpintería",
      code: "CAR-001",
      description: "Aberturas de madera, muebles a medida, revestimientos.",
      projects: 6,
      color: "#c2410c",
    },
  ];

  return (
    <div className="fade-in">
      <PageHeader>
        <h2>Rubros</h2>
        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nuevo Rubro
        </Button>
      </PageHeader>

      <AreasGrid>
        {areas.map((area) => (
          <AreaCard key={area.id} $color={area.color} className="scale-in">
            <div className="header">
              <h3 className="title">{area.name}</h3>
              <div className="actions">
                <Button variant="ghost" size="sm" title="Editar">
                  <FaEdit />
                </Button>
                <Button variant="ghost" size="sm" title="Eliminar">
                  <FaTrash />
                </Button>
              </div>
            </div>
            <div className="content">
              <div
                style={{
                  marginBottom: "var(--space-2)",
                  color: "var(--color-secondary-500)",
                  fontSize: "0.9rem",
                }}
              >
                Código: {area.code}
              </div>
              {area.description}
            </div>
            <div className="meta">
              <span>Proyectos activos: {area.projects}</span>
            </div>
          </AreaCard>
        ))}
      </AreasGrid>
    </div>
  );
}

export default Areas;
