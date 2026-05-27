import { motion, AnimatePresence } from "framer-motion";
import type { Patient } from "../../types/patient";
import Avatar from "./Avatar";

type Props = {
	patient: Patient;
	isOpen: boolean;
	onToggle: () => void;
	onEdit: (patient: Patient) => void;
	onDelete: (id: string) => void;
};

function PatientCard({ patient, isOpen, onToggle, onEdit, onDelete }: Props) {
	return (
		<div style={card}>
			<div style={header}>
				<div>
					<strong>{patient.name}</strong>
				</div>

				<div style={{ display: "flex", gap: 8 }}>
					<button onClick={onToggle}>{isOpen ? "Hide" : "View"}</button>

					<button onClick={() => onEdit(patient)}>Edit</button>

					<button onClick={() => onDelete(patient.id)}>Delete</button>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						style={{ overflow: "hidden" }}
					>
						<div style={content}>
							<Avatar src={patient.avatar} name={patient.name} size={50} />

							<p>{patient.description}</p>

							<a href={patient.website} target="_blank">
								Visit
							</a>

							<p>Created: {new Date(patient.createdAt).toLocaleString()}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

const card: React.CSSProperties = {
	border: "1px solid #ddd",
	padding: 12,
	borderRadius: 8,
	marginBottom: 10,
};

const header: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const content: React.CSSProperties = {
	paddingTop: 10,
	display: "flex",
	flexDirection: "column",
	gap: 8,
};

export default PatientCard;
