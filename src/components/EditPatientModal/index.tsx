import type { Dispatch, SetStateAction } from "react";
import PatientForm from "../PatientForm";
import type { PatientFormData } from "../../types/patient";

type Props = {
	formData: PatientFormData;
	setFormData: Dispatch<SetStateAction<PatientFormData>>;
	onUpdate: () => void;
	onClose: () => void;
};

function EditPatientModal({ formData, setFormData, onUpdate, onClose }: Props) {
	return (
		<div style={overlayStyle}>
			<div style={modalStyle}>
				<h2>Edit Patient</h2>

				<PatientForm formData={formData} setFormData={setFormData} />

				<div style={{ display: "flex", gap: 8 }}>
					<button onClick={onUpdate}>Update</button>
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

export default EditPatientModal;
