import styled from "styled-components";
import React from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import {
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaCheck,
  FaHourglass,
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

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
`;

const ReportCard = styled(Card)`
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ReportIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem;
  }
`;

const ReportContent = styled.div`
  flex: 1;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
  flex-wrap: wrap;
  gap: var(--space-2);

  h3 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;

  ${(props) => {
    if (props.$status === "approved") {
      return `
        background-color: rgba(34, 197, 94, 0.1);
        color: var(--color-success-500);
      `;
    } else if (props.$status === "pending") {
      return `
        background-color: rgba(245, 158, 11, 0.1);
        color: var(--color-warning-500);
      `;
    }
    return "";
  }}
`;

const ReportDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-3);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  .label {
    font-size: 0.8rem;
    color: var(--color-secondary-500);
    margin-bottom: 2px;
  }

  .value {
    font-weight: 500;
  }
`;

const ReportActions = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-3);
`;

function DailyReports() {
  // Mock data for reports
  const reports = [
    {
      id: 1,
      date: "2023-11-15",
      employeeName: "Juan Pérez",
      projectName: "Edificio Central",
      hours: 8,
      tasks: "Colocación de mampostería y revoque",
      status: "approved",
      approvedBy: "Carlos Gómez",
    },
    {
      id: 2,
      date: "2023-11-15",
      employeeName: "María González",
      projectName: "Residencia Aguirre",
      hours: 6,
      tasks: "Instalación eléctrica en dormitorios",
      status: "pending",
      approvedBy: null,
    },
    {
      id: 3,
      date: "2023-11-14",
      employeeName: "Roberto Fernández",
      projectName: "Oficinas Centrales",
      hours: 8,
      tasks: "Colocación de mobiliario y terminaciones en madera",
      status: "approved",
      approvedBy: "Carlos Gómez",
    },
  ];

  return (
    <div className="fade-in">
      <PageHeader>
        <SearchBar>
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar por fecha, empleado o proyecto..."
          />
        </SearchBar>

        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nuevo Parte Diario
        </Button>
      </PageHeader>

      <ReportsGrid>
        {reports.map((report) => (
          <ReportCard key={report.id} className="slide-in">
            <ReportIcon>
              <FaFileAlt />
            </ReportIcon>

            <ReportContent>
              <ReportHeader>
                <h3>Parte Diario #{report.id}</h3>
                <StatusBadge $status={report.status}>
                  {report.status === "approved" ? (
                    <>
                      <FaCheck size={10} /> Aprobado
                    </>
                  ) : (
                    <>
                      <FaHourglass size={10} /> Pendiente
                    </>
                  )}
                </StatusBadge>
              </ReportHeader>

              <ReportDetails>
                <DetailItem>
                  <div className="label">Fecha</div>
                  <div className="value">
                    {new Date(report.date).toLocaleDateString()}
                  </div>
                </DetailItem>
                <DetailItem>
                  <div className="label">Empleado</div>
                  <div className="value">{report.employeeName}</div>
                </DetailItem>
                <DetailItem>
                  <div className="label">Proyecto</div>
                  <div className="value">{report.projectName}</div>
                </DetailItem>
                <DetailItem>
                  <div className="label">Horas Trabajadas</div>
                  <div className="value">{report.hours}h</div>
                </DetailItem>
              </ReportDetails>

              <DetailItem>
                <div className="label">Tareas Realizadas</div>
                <div className="value">{report.tasks}</div>
              </DetailItem>

              {report.status === "approved" && (
                <DetailItem style={{ marginTop: "var(--space-3)" }}>
                  <div className="label">Aprobado por</div>
                  <div className="value">{report.approvedBy}</div>
                </DetailItem>
              )}

              <ReportActions>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
                {report.status === "pending" && (
                  <Button variant="success" size="sm">
                    Aprobar
                  </Button>
                )}
              </ReportActions>
            </ReportContent>
          </ReportCard>
        ))}
      </ReportsGrid>
    </div>
  );
}

export default DailyReports;
