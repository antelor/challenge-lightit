import { useForm } from "react-hook-form";
import type { PatientFormData } from "../../types/patient";
import PatientForm from "../PatientForm";

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
					<PatientForm register={register} errors={errors} />

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
