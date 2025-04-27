import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => 
    props.$size === 'sm' ? 'var(--space-1) var(--space-3)' : 
    props.$size === 'lg' ? 'var(--space-3) var(--space-6)' : 
    'var(--space-2) var(--space-4)'
  };
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all var(--transition-fast);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: ${props => 
    props.$size === 'sm' ? '0.875rem' : 
    props.$size === 'lg' ? '1.125rem' : 
    '1rem'
  };
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Variants */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: var(--color-primary-600);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-primary-700);
          }
          &:active:not(:disabled) {
            background-color: var(--color-primary-800);
          }
        `;
      case 'secondary':
        return `
          background-color: var(--color-secondary-200);
          color: var(--color-secondary-800);
          &:hover:not(:disabled) {
            background-color: var(--color-secondary-300);
          }
          &:active:not(:disabled) {
            background-color: var(--color-secondary-400);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: var(--color-primary-600);
          border: 1px solid var(--color-primary-600);
          &:hover:not(:disabled) {
            background-color: var(--color-primary-50);
          }
          &:active:not(:disabled) {
            background-color: var(--color-primary-100);
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: var(--color-secondary-700);
          &:hover:not(:disabled) {
            background-color: var(--color-secondary-100);
          }
          &:active:not(:disabled) {
            background-color: var(--color-secondary-200);
          }
        `;
      case 'success':
        return `
          background-color: var(--color-success-500);
          color: white;
          &:hover:not(:disabled) {
            filter: brightness(0.9);
          }
        `;
      case 'error':
        return `
          background-color: var(--color-error-500);
          color: white;
          &:hover:not(:disabled) {
            filter: brightness(0.9);
          }
        `;
      default:
        return `
          background-color: var(--color-primary-600);
          color: white;
          &:hover:not(:disabled) {
            background-color: var(--color-primary-700);
          }
          &:active:not(:disabled) {
            background-color: var(--color-primary-800);
          }
        `;
    }
  }}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Icon spacing */
  svg {
    ${props => props.$iconPosition === 'left' && `
      margin-right: var(--space-2);
    `}
    
    ${props => props.$iconPosition === 'right' && `
      margin-left: var(--space-2);
    `}
  }
`;

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  iconPosition = 'left',
  className = '',
  ...props 
}) {
  return (
    <ButtonContainer 
      $variant={variant} 
      $size={size} 
      $fullWidth={fullWidth}
      $iconPosition={iconPosition}
      className={className}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
}

export default Button;