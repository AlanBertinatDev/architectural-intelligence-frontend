import React, { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: var(--space-4);
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--color-secondary-700);
`;

const InputField = styled.input`
  width: 100%;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-secondary-300);
  background-color: var(--color-surface);
  transition: all var(--transition-fast);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }
  
  &:disabled {
    background-color: var(--color-secondary-100);
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: var(--color-secondary-400);
  }
  
  ${props => props.$hasError && `
    border-color: var(--color-error-500) !important;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }
  `}
`;

const ErrorMessage = styled.div`
  color: var(--color-error-500);
  font-size: 0.8rem;
  margin-top: var(--space-1);
`;

const Input = forwardRef(
  ({ 
    label, 
    id, 
    error, 
    className = '',
    ...props 
  }, ref) => {
    const inputId = id || Math.random().toString(36).substr(2, 9);
    
    return (
      <InputContainer className={className}>
        {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
        <InputField 
          id={inputId} 
          ref={ref} 
          $hasError={!!error} 
          {...props} 
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

export default Input;