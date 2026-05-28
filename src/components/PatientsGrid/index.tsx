import { AnimatePresence, motion } from "framer-motion";
import type { Patient } from "../../types/patient";
import PatientCard from "../PatientCard";
import PatientCardSkeleton from "../PatientCardSkeleton";
import EmptyState from "../EmptyState";

type Props = {
	loading: boolean;
	patients: Patient[];
	page: number;
	pageSize: number;
	expandedId: string | null;
	onToggle: (id: string) => void;
	onEdit: (patient: Patient) => void;
	onDelete: (patient: Patient) => void;
	setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PatientsGrid({
	loading,
	patients,
	page,
	pageSize,
	expandedId,
	onToggle,
	onEdit,
	onDelete,
	setIsAddModalOpen,
}: Props) {
	if (loading) {
		return (
			<div style={grid}>
				{Array.from({ length: pageSize }).map((_, i) => (
					<PatientCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (patients.length === 0) {
		return <EmptyState setIsAddModalOpen={setIsAddModalOpen} />;
	}

	return (
		<motion.div
			style={grid}
			key={`${page}-${patients.length}`}
			variants={container}
			initial="hidden"
			animate="show"
		>
			<AnimatePresence mode="popLayout">
				{patients.map((patient) => (
					<motion.div
						key={patient.id}
						layout
						style={card}
						variants={item}
						initial="hidden"
						animate="show"
						exit="exit"
					>
						<PatientCard
							patient={patient}
							isOpen={expandedId === patient.id}
							onToggle={() => onToggle(patient.id)}
							onEdit={onEdit}
							onDelete={() => onDelete(patient)}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}

const grid: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
	gap: 12,
	alignItems: "start",
};

const card: React.CSSProperties = {
	border: "1px solid #e5e7eb",
	borderRadius: 12,
	padding: 12,
	marginBottom: 10,
};

const container = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 10, scale: 0.98 },
	show: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 10, scale: 0.95 },
};

export default PatientsGrid;
