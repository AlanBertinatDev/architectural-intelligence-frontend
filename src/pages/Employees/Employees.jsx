// (importaciones como ya las tenías)
import { useState, useEffect } from "react";
import React from "react";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import api from "../../services/api";
import {
  PageHeader,
  SearchBar,
  Table,
  StyledTable,
  Modal,
  ModalContent,
  ModalHeader,
  Form,
  FormActions,
  FileUpload,
  FileList,
} from "./EmployeesStyles";
import { FaPlus, FaSearch, FaTimes, FaUpload, FaTrash } from "react-icons/fa";

function Employees() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  const [formData, setFormData] = useState({
    cedula: "",
    nombreCompleto: "",
    fechaNacimiento: "",
    fechaIngreso: "",
    estadoCivil: "",
    domicilio: "",
    correo: "",
    activo: true,
    obraId: "",
  });

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchEmpleados = async () => {
    try {
      const response = await api.get("/empleados");
      if (response.status === 200) {
        setEmpleados(response.data);
      }
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      alert("Error al cargar empleados.");
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const allowedType = "application/pdf";
    const maxSize = 5 * 1024 * 1024;
    const filtered = newFiles.filter(
      (f) => f.type === allowedType && f.size <= maxSize
    );
    if (filtered.length !== newFiles.length) {
      alert("Solo se permiten PDFs de hasta 5MB.");
    }
    setFiles((prev) => [...prev, ...filtered]);
  };

  const handleEdit = async (empleado) => {
    setFormData({
      id: empleado.id,
      cedula: empleado.cedula,
      nombreCompleto: empleado.nombreCompleto,
      fechaNacimiento: empleado.fechaNacimiento
        ? formatDate(empleado.fechaNacimiento)
        : "",
      fechaIngreso: empleado.fechaIngreso
        ? formatDate(empleado.fechaIngreso)
        : "",
      estadoCivil: empleado.estadoCivil,
      domicilio: empleado.domicilio,
      correo: empleado.correo,
      activo: empleado.activo,
      obraId: empleado.obraId,
    });

    try {
      const res = await api.get(`/empleados/${empleado.id}/adjuntos`);
      if (res.status === 200) {
        setExistingFiles(res.data);
      }
    } catch (error) {
      alert("Error al cargar archivos adjuntos.");
    }

    setFiles([]);
    setDeletedFileIds([]);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingFile = (fileId) => {
    setDeletedFileIds((prev) => [...prev, fileId]);
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleViewFile = async (fileId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8080/api/empleados/adjuntos/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("No se pudo obtener el archivo");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      alert("Error al abrir el archivo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("empleado", JSON.stringify(formData));
    files.forEach((file) => data.append("files", file));

    // ✅ Enviamos un solo parámetro con el array como JSON string
    data.append("idsAdjuntosAEliminar", JSON.stringify(deletedFileIds));

    try {
      const res = formData.id
        ? await api.put(`/empleados/${formData.id}`, data)
        : await api.post("/empleados", data);

      if (res.status === 200 || res.status === 201) {
        alert("Empleado guardado exitosamente");
        fetchEmpleados();
      } else {
        alert("Hubo un error al guardar el empleado.");
      }
    } catch (error) {
      alert("Error en la solicitud.");
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      cedula: "",
      nombreCompleto: "",
      fechaNacimiento: "",
      fechaIngreso: "",
      estadoCivil: "",
      domicilio: "",
      correo: "",
      activo: true,
      obraId: "",
    });
    setFiles([]);
    setExistingFiles([]);
    setDeletedFileIds([]);
  };

  return (
    <div className="fade-in">
      <PageHeader>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Buscar empleado..." />
        </SearchBar>
        <Button
          variant="primary"
          iconPosition="left"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Nuevo Empleado
        </Button>
      </PageHeader>

      <Table>
        <StyledTable>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.cedula}</td>
                <td>{emp.nombreCompleto}</td>
                <td>{emp.correo}</td>
                <td>{emp.activo ? "Activo" : "Inactivo"}</td>
                <td>
                  <Button variant="secondary" onClick={() => handleEdit(emp)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Table>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>{formData.id ? "Editar Empleado" : "Nuevo Empleado"}</h2>
              <Button variant="ghost" onClick={closeModal}>
                <FaTimes />
              </Button>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <Input
                label="Cédula"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Nombre Completo"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                label="Fecha de Ingreso"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Estado Civil"
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleInputChange}
              />
              <Input
                label="Domicilio"
                name="domicilio"
                value={formData.domicilio}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                label="Correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
              <Input
                label="Obra ID"
                name="obraId"
                value={formData.obraId}
                onChange={handleInputChange}
                required
              />

              {existingFiles.length > 0 && (
                <FileList>
                  {existingFiles.map((file) => (
                    <div key={file.id} className="file-item">
                      <FaUpload />
                      <span className="file-name">{file.fileName}</span>
                      <button
                        type="button"
                        onClick={() => handleViewFile(file.id)}
                      >
                        Ver
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingFile(file.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </FileList>
              )}

              <FileUpload>
                <input
                  type="file"
                  id="files"
                  multiple
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
                <label htmlFor="files">
                  <FaUpload />
                  <p>Haga clic o arrastre archivos aquí (PDF máx. 5MB)</p>
                </label>
              </FileUpload>

              {files.length > 0 && (
                <div>
                  <p className="file-upload-info">
                    Archivos seleccionados: {files.length}
                  </p>
                  <FileList>
                    {files.map((file, i) => (
                      <div key={i} className="file-item">
                        <FaUpload />
                        <span className="file-name">{file.name}</span>
                        <button type="button" onClick={() => removeFile(i)}>
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </FileList>
                </div>
              )}

              <FormActions>
                <Button type="button" variant="secondary" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Guardar
                </Button>
              </FormActions>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Employees;
