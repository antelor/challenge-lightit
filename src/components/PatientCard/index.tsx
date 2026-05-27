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
				<div style={left}>
					<Avatar src={patient.avatar} name={patient.name} size={40} />

					<div>
						<div style={name}>{patient.name}</div>
						<div style={sub}>Patient</div>
					</div>
				</div>

				<button onClick={onToggle}>{isOpen ? "Collapse" : "Expand"}</button>
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
							<p style={description}>{patient.description}</p>

							<div style={footer}>
								<a href={patient.website} target="_blank">
									Visit website
								</a>

								<div style={actions}>
									<button onClick={() => onEdit(patient)}>Edit</button>
									<button onClick={() => onDelete(patient.id)}>Delete</button>
								</div>
							</div>

							<div style={meta}>
								Created {new Date(patient.createdAt).toLocaleString()}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

const card: React.CSSProperties = {
	border: "1px solid #e5e7eb",
	borderRadius: 12,
	padding: 12,
	marginBottom: 10,
	height: "fit-content",
};

const header: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const left: React.CSSProperties = {
	display: "flex",
	gap: 10,
	alignItems: "center",
};

const name: React.CSSProperties = {
	fontWeight: 600,
};

const sub: React.CSSProperties = {
	fontSize: 12,
	color: "#6b7280",
};

const content: React.CSSProperties = {
	marginTop: 10,
	display: "flex",
	flexDirection: "column",
	gap: 10,
};

const description: React.CSSProperties = {
	margin: 0,
	maxWidth: "65ch",
};

const footer: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const actions: React.CSSProperties = {
	display: "flex",
	gap: 6,
};

const meta: React.CSSProperties = {
	fontSize: 12,
	color: "#9ca3af",
	marginTop: 6,
};

export default PatientCard;
