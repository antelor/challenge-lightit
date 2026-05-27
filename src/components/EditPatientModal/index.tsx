import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Patient, PatientFormData } from "../../types/patient";

type Props = {
  patient: Patient;
  onUpdate: (data: PatientFormData) => void;
  onClose: () => void;
};

function EditPatientModal({ patient, onUpdate, onClose }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormData>();

  useEffect(() => {
    reset({
      name: patient.name,
      avatar: patient.avatar,
      description: patient.description,
      website: patient.website,
    });
  }, [patient, reset]);

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Edit Patient</h2>

        <form onSubmit={handleSubmit(onUpdate)}>
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}

          <input
            placeholder="Avatar URL"
            {...register("avatar", {
              required: "Avatar is required",
            })}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}

          <textarea
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}

          <input
            placeholder="Website"
            {...register("website", {
              required: "Website is required",
            })}
          />
          {errors.website && <p>{errors.website.message}</p>}

          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal: React.CSSProperties = {
  background: "white",
  padding: 20,
  borderRadius: 8,
  minWidth: 320,
};

export default EditPatientModal;