import styled from "styled-components";
import React from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaHourglass,
  FaPause,
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
`;

const ProjectTitle = styled.div`
  h3 {
    margin: 0 0 4px 0;
    font-size: 1.2rem;
  }

  .code {
    font-size: 0.9rem;
    color: var(--color-secondary-500);
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  white-space: nowrap;

  svg {
    margin-right: 4px;
    font-size: 0.7rem;
  }

  ${(props) => {
    switch (props.$status) {
      case "completed":
        return `
          background-color: rgba(34, 197, 94, 0.1);
          color: var(--color-success-500);
        `;
      case "in_progress":
        return `
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--color-primary-600);
        `;
      case "paused":
        return `
          background-color: rgba(245, 158, 11, 0.1);
          color: var(--color-warning-500);
        `;
      default:
        return "";
    }
  }}
`;

const ProjectDetails = styled.div`
  margin-bottom: var(--space-4);

  .description {
    margin-bottom: var(--space-4);
    color: var(--color-secondary-700);
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
    font-size: 0.95rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  .detail-item {
    display: flex;
    flex-direction: column;

    .label {
      color: var(--color-secondary-500);
      font-size: 0.85rem;
      margin-bottom: 2px;
    }

    .value {
      font-weight: 500;
    }
  }
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: var(--color-secondary-100);
  border-radius: 4px;
  margin-bottom: var(--space-3);
  overflow: hidden;

  .bar {
    height: 100%;
    background-color: var(--color-primary-500);
    border-radius: 4px;
    width: ${(props) => props.$progress || "0%"};
  }
`;

const ProjectActions = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-secondary-200);
`;

function Projects() {
  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Edificio Residencial Torres del Río",
      code: "PROJ-001",
      client: "Desarrollos Urbanos S.A.",
      architect: "Arq. Roberto Méndez",
      description:
        "Edificio residencial de 12 pisos con 48 unidades, amenities y cocheras.",
      location: "Av. Libertador 1500, CABA",
      startDate: "2023-03-15",
      endDate: "2024-09-30",
      progress: 45,
      status: "in_progress",
      budget: 950000000,
    },
    {
      id: 2,
      name: "Oficinas Corporativas Mitre",
      code: "PROJ-002",
      client: "Grupo Inversiones ABC",
      architect: "Arq. Laura Fernández",
      description:
        "Remodelación y acondicionamiento de oficinas corporativas en 3 pisos.",
      location: "Av. Mitre 230, Buenos Aires",
      startDate: "2023-02-10",
      endDate: "2023-08-20",
      progress: 100,
      status: "completed",
      budget: 180000000,
    },
    {
      id: 3,
      name: "Complejo Comercial Zona Norte",
      code: "PROJ-003",
      client: "Desarrolladora Comercial S.A.",
      architect: "Arq. Carlos Gómez",
      description:
        "Centro comercial con 25 locales comerciales, patio de comidas y estacionamiento.",
      location: "Ruta Panamericana Km 30, Buenos Aires",
      startDate: "2023-05-05",
      endDate: "2024-05-10",
      progress: 25,
      status: "paused",
      budget: 650000000,
    },
  ];

  const formatCurrency = (amount) => {
    return "$ " + amount.toLocaleString();
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "in_progress":
        return "En Progreso";
      case "paused":
        return "Pausado";
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheck />;
      case "in_progress":
        return <FaHourglass />;
      case "paused":
        return <FaPause />;
      default:
        return null;
    }
  };

  return (
    <div className="fade-in">
      <PageHeader>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Buscar proyecto..." />
        </SearchBar>

        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nuevo Proyecto
        </Button>
      </PageHeader>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} className="scale-in">
            <ProjectHeader>
              <ProjectTitle>
                <h3>{project.name}</h3>
                <div className="code">{project.code}</div>
              </ProjectTitle>
              <StatusBadge $status={project.status}>
                {getStatusIcon(project.status)} {getStatusText(project.status)}
              </StatusBadge>
            </ProjectHeader>

            <ProjectDetails>
              <div className="description">{project.description}</div>

              <ProgressBar $progress={`${project.progress}%`}>
                <div className="bar"></div>
              </ProgressBar>

              <div className="detail-grid">
                <div className="detail-item">
                  <div className="label">Cliente</div>
                  <div className="value">{project.client}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Arquitecto</div>
                  <div className="value">{project.architect}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Ubicación</div>
                  <div className="value">{project.location}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Presupuesto</div>
                  <div className="value">{formatCurrency(project.budget)}</div>
                </div>
                <div className="detail-item">
                  <div className="label">Fecha Inicio</div>
                  <div className="value">
                    {new Date(project.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="detail-item">
                  <div className="label">Fecha Finalización</div>
                  <div className="value">
                    {new Date(project.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </ProjectDetails>

            <ProjectActions>
              <Button variant="outline" size="sm">
                Ver Detalles
              </Button>
              <Button variant="outline" size="sm">
                Editar
              </Button>
              {project.status === "paused" && (
                <Button variant="primary" size="sm">
                  Reanudar
                </Button>
              )}
            </ProjectActions>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </div>
  );
}

export default Projects;
