import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { Patient, PatientFormData } from "../../types/patient";
import PatientForm from "../PatientForm";
import Button from "../Button";
import Modal from "../Modal";

type Props = {
  open: boolean;
  patient: Patient;
  onUpdate: (data: PatientFormData) => void;
  onClose: () => void;
};

function EditPatientModal({ open, patient, onUpdate, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormData>();

  useEffect(() => {
    if (!open) return;

    reset({
      name: patient.name,
      avatar: patient.avatar,
      description: patient.description,
      website: patient.website,
    });
  }, [open, patient, reset]);

  function onSubmit(data: PatientFormData) {
    onUpdate(data);
    toast.success("Patient edited successfully");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div style={header}>
        <h2 style={title}>Edit Patient</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={form}>
        <div style={content}>
          <PatientForm register={register} errors={errors} />
        </div>

        <div style={footer}>
          <Button type="button" variant="danger" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Update Patient
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

export default EditPatientModal;