import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { PatientFormData } from "../../types/patient";
import PatientForm from "../PatientForm";
import Button from "../Button";
import Modal from "../Modal";

type Props = {
  open: boolean;
  onSave: (data: PatientFormData) => void;
  onClose: () => void;
};

function AddPatientModal({ open, onSave, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>();

  function onSubmit(data: PatientFormData) {
    onSave(data);
    toast.success("Patient added successfully");
    onClose();
  }

  function onError() {
    toast.error("Please fix form errors");
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div style={header}>
        <h2 style={title}>Add Patient</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} style={form}>
        <div style={content}>
          <PatientForm register={register} errors={errors} />
        </div>

        <div style={footer}>
          <Button type="button" variant="danger" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Save Patient
          </Button>
        </div>
      </form>
    </Modal>
  );
}

const header: React.CSSProperties = {
  padding: "16px 18px",
  borderBottom: "1px solid #e5e7eb",
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
};

const form: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const content: React.CSSProperties = {
  padding: 18,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const footer: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  padding: 16,
  borderTop: "1px solid #e5e7eb",
};

export default AddPatientModal;