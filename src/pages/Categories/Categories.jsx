import styled from "styled-components";
import Card from "../../components/UI/Card";
import React from "react";
import Button from "../../components/UI/Button";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
`;

const CategoriesGrid = styled.div`
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

const CategoryCard = styled(Card)`
  border-left: 4px solid var(--color-primary-500);

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

function Categories() {
  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: "Albañil",
      rate: 1200,
      employees: 12,
      description: "Trabajos de construcción general y mampostería.",
    },
    {
      id: 2,
      name: "Electricista",
      rate: 1500,
      employees: 8,
      description: "Instalación y mantenimiento de sistemas eléctricos.",
    },
    {
      id: 3,
      name: "Plomero",
      rate: 1400,
      employees: 6,
      description: "Instalación y reparación de sistemas de tuberías.",
    },
    {
      id: 4,
      name: "Pintor",
      rate: 1100,
      employees: 9,
      description: "Preparación y aplicación de pinturas en superficies.",
    },
    {
      id: 5,
      name: "Carpintero",
      rate: 1300,
      employees: 7,
      description: "Construcción de estructuras y elementos de madera.",
    },
  ];

  return (
    <div className="fade-in">
      <PageHeader>
        <h2>Categorías de Empleados</h2>
        <Button variant="primary" iconPosition="left">
          <FaPlus /> Nueva Categoría
        </Button>
      </PageHeader>

      <CategoriesGrid>
        {categories.map((category) => (
          <CategoryCard key={category.id} className="scale-in">
            <div className="header">
              <h3 className="title">{category.name}</h3>
              <div className="actions">
                <Button variant="ghost" size="sm" title="Editar">
                  <FaEdit />
                </Button>
                <Button variant="ghost" size="sm" title="Eliminar">
                  <FaTrash />
                </Button>
              </div>
            </div>
            <div className="content">{category.description}</div>
            <div className="meta">
              <span>Tarifa: ${category.rate}/h</span>
              <span>{category.employees} empleados</span>
            </div>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </div>
  );
}

export default Categories;
