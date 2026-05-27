import { useForm } from "react-hook-form";
import type { PatientFormData } from "../../types/patient";

type Props = {
  onSave: (data: PatientFormData) => void;
  onClose: () => void;
};

function AddPatientModal({ onSave, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>();

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Add Patient</h2>

        <form onSubmit={handleSubmit(onSave)}>
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}

          <input
            placeholder="Avatar URL"
            {...register("avatar", {
              required: "Avatar is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Invalid URL",
              },
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
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Invalid URL",
              },
            })}
          />
          {errors.website && <p>{errors.website.message}</p>}

          <button type="submit">Save</button>
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

export default AddPatientModal;