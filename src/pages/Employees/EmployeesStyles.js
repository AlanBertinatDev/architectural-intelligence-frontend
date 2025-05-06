import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
  gap: var(--space-4);
`;

export const SearchBar = styled.div`
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

export const Table = styled.div`
  overflow-x: auto;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: var(--space-4);
    text-align: left;
    border-bottom: 1px solid var(--color-secondary-200);
  }

  th {
    background-color: var(--color-secondary-50);
    font-weight: 600;
    color: var(--color-secondary-700);
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: var(--color-secondary-50);
  }

  .actions {
    display: flex;
    gap: var(--space-2);
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
`;

export const ModalContent = styled.div`
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
  grid-column: 1 / -1;
`;

export const FileUpload = styled.div`
  grid-column: 1 / -1;
  border: 2px dashed var(--color-secondary-300);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary-400);
    background-color: var(--color-primary-50);
  }

  input {
    display: none;
  }
`;

export const FileList = styled.div`
  grid-column: 1 / -1;

  .file-item {
    display: flex;
    align-items: center;
    padding: var(--space-2);
    background-color: var(--color-secondary-50);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-2);

    .file-name {
      flex: 1;
      margin-left: var(--space-2);
    }

    button {
      padding: var(--space-1);
      background: none;
      border: none;
      color: var(--color-error-500);
      cursor: pointer;

      &:hover {
        color: var(--color-error-600);
      }
    }
  }
`;
