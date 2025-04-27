import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import Card from "../../components/UI/Card";
import BarChart from "../../components/Charts/BarChart";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import { FaUsers, FaClock, FaClipboardCheck } from "react-icons/fa";

const DashboardContainer = styled.div``;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled(Card)`
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-4);

  svg {
    font-size: 1.5rem;
  }

  ${(props) =>
    props.$type === "secondary" &&
    `
    background-color: var(--color-secondary-100);
    color: var(--color-secondary-600);
  `}

  ${(props) =>
    props.$type === "success" &&
    `
    background-color: rgba(34, 197, 94, 0.1);
    color: var(--color-success-500);
  `}
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
`;

const StatLabel = styled.div`
  color: var(--color-secondary-500);
  font-size: 0.9rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

function Dashboard() {
  // Mock data for the dashboard
  const [employeeData, setEmployeeData] = useState({
    totalEmployees: 45,
    hoursWorkedThisMonth: 3240,
    completedProjects: 8,
  });

  // Mock data for the charts
  const monthlyHoursData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Horas Trabajadas",
        data: [820, 760, 900, 760],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: [
      "Albañiles",
      "Electricistas",
      "Plomeros",
      "Pintores",
      "Carpinteros",
    ],
    datasets: [
      {
        label: "Horas por Categoría",
        data: [1200, 800, 500, 400, 340],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(107, 114, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardContainer className="fade-in">
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <FaUsers />
          </StatIcon>
          <StatContent>
            <StatValue>{employeeData.totalEmployees}</StatValue>
            <StatLabel>Empleados Activos</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $type="secondary">
            <FaClock />
          </StatIcon>
          <StatContent>
            <StatValue>{employeeData.hoursWorkedThisMonth}</StatValue>
            <StatLabel>Horas Trabajadas este Mes</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon $type="success">
            <FaClipboardCheck />
          </StatIcon>
          <StatContent>
            <StatValue>{employeeData.completedProjects}</StatValue>
            <StatLabel>Proyectos Completados</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <Card title="Horas Trabajadas por Semana">
          <BarChart data={monthlyHoursData} height="300px" />
        </Card>

        <Card title="Horas por Categoría de Empleado">
          <DoughnutChart data={categoryData} height="300px" />
        </Card>
      </ChartsGrid>
    </DashboardContainer>
  );
}

export default Dashboard;
