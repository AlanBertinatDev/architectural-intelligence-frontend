import styled from "styled-components";
import React from "react";

const CardContainer = styled.div`
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  transition: transform var(--transition-normal),
    box-shadow var(--transition-normal);
  height: 100%;

  ${(props) =>
    props.$interactive &&
    `
    cursor: pointer;
    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
  `}

  ${(props) =>
    props.$variant === "primary" &&
    `
    border-top: 4px solid var(--color-primary-500);
  `}
  
  ${(props) =>
    props.$variant === "secondary" &&
    `
    border-top: 4px solid var(--color-secondary-500);
  `}
  
  ${(props) =>
    props.$variant === "success" &&
    `
    border-top: 4px solid var(--color-success-500);
  `}
  
  ${(props) =>
    props.$variant === "warning" &&
    `
    border-top: 4px solid var(--color-warning-500);
  `}
  
  ${(props) =>
    props.$variant === "error" &&
    `
    border-top: 4px solid var(--color-error-500);
  `}
`;

const CardHeader = styled.div`
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 1.25rem;
    margin: 0;
    color: var(--color-secondary-900);
  }
`;

const CardContent = styled.div``;

const CardFooter = styled.div`
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-secondary-200);
`;

function Card({
  title,
  children,
  footer,
  variant,
  interactive = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <CardContainer
      $variant={variant}
      $interactive={interactive}
      className={`scale-in ${className}`}
      onClick={onClick}
      {...props}
    >
      {title && (
        <CardHeader>
          <h2>{title}</h2>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
}

export default Card;
