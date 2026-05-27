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
				{Array.from({
					length: pageSize,
				}).map((_, i) => (
					<PatientCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (patients.length === 0) {
		return <EmptyState setIsAddModalOpen={setIsAddModalOpen} />;
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				style={grid}
				key={`${page}-${patients.length}`}
				initial={{
					opacity: 0,
					y: 10,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{
					opacity: 0,
					y: -10,
				}}
				transition={{
					duration: 0.2,
				}}
			>
				{patients.map((patient) => (
					<PatientCard
						key={patient.id}
						patient={patient}
						isOpen={expandedId === patient.id}
						onToggle={() => onToggle(patient.id)}
						onEdit={onEdit}
						onDelete={() => onDelete(patient)}
					/>
				))}
			</motion.div>
		</AnimatePresence>
	);
}

const grid: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: 12,
	alignItems: "start",
};

export default PatientsGrid;
