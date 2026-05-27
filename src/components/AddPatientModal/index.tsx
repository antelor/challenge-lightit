import type { Dispatch, SetStateAction } from "react";
import PatientForm from "../PatientForm";

type FormState = {
  name: string;
  avatar: string;
  description: string;
  website: string;
};

type Props = {
  formData: FormState;
  setFormData: Dispatch<SetStateAction<FormState>>;
  onSave: () => void;
  onClose: () => void;
};

function AddPatientModal({
  formData,
  setFormData,
  onSave,
  onClose,
}: Props) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Add Patient</h2>

        <PatientForm
          formData={formData}
          setFormData={setFormData}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  minWidth: 320,
};

export default AddPatientModal;