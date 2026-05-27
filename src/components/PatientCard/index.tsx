import type { Patient } from "../../types/types";
import Avatar from "./Avatar";

type Props = {
	patient: Patient;
	onView: (patient: Patient) => void;
	onEdit?: (patient: Patient) => void;
	onDelete?: (id: string) => void;
};

function PatientCard({ patient, onView, onEdit, onDelete }: Props) {
	return (
		<div
			style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}
		>
			<Avatar name={patient.name} src={patient.avatar} size={50} />
			<h3>{patient.name}</h3>

			<p>Created: {new Date(patient.createdAt).toLocaleDateString()}</p>

			<div style={{ display: "flex", gap: 8 }}>
				<button onClick={() => onView(patient)}>View Details</button>

				{onEdit && <button onClick={() => onEdit(patient)}>Edit</button>}

				{onDelete && (
					<button onClick={() => onDelete(patient.id)}>Delete</button>
				)}
			</div>
		</div>
	);
}

export default PatientCard;
