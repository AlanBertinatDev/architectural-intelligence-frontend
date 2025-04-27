import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  height: ${(props) => props.$height || "300px"};
  position: relative;
`;

function DoughnutChart({ data, options = {}, height, className = "" }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 10,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        cornerRadius: 4,
        displayColors: true,
      },
    },
    cutout: "70%",
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  // Merge default options with user options
  const chartOptions = { ...defaultOptions, ...options };

  return (
    <ChartContainer $height={height} className={`scale-in ${className}`}>
      <Doughnut data={data} options={chartOptions} />
    </ChartContainer>
  );
}

export default DoughnutChart;
