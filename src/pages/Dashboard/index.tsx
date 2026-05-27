import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { Patient } from "../../types/patient";
import type { PatientFormData } from "../../types/patient";

import PatientCard from "../../components/PatientCard";
import PatientCardSkeleton from "../../components/PatientCardSkeleton";
import AddPatientModal from "../../components/AddPatientModal";
import EditPatientModal from "../../components/EditPatientModal";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import EmptyState from "../../components/EmptyState";
import ConfirmModal from "../../components/ConfirmModal";

import toast from "react-hot-toast";

import { usePagination } from "../../hooks/usePagination";
import { usePatients } from "../../hooks/usePatients";

const PAGE_SIZE = 10;

function Dashboard() {
	const { patients, loading, error, addPatient, editPatient, deletePatient } =
		usePatients();

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

	const [expandedId, setExpandedId] = useState<string | null>(null);

	const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null);

	const {
		page,
		totalPages,
		paginated: paginatedPatients,
		updatePage,
		resetPage,
	} = usePagination({
		items: patients,
		pageSize: PAGE_SIZE,
	});

	function toggle(id: string) {
		setExpandedId((prev) => (prev === id ? null : id));
	}

	function handleAddPatient(data: PatientFormData) {
		addPatient(data);

		resetPage();
		setIsAddModalOpen(false);
	}

	function handleEditPatient(data: PatientFormData) {
		if (!editingPatient) return;

		editPatient(editingPatient.id, data);

		setEditingPatient(null);
		setIsEditModalOpen(false);
	}

	function requestDelete(patient: Patient) {
		setDeleteTarget(patient);
	}

	function handleDelete() {
		if (!deleteTarget) return;

		deletePatient(deleteTarget.id);

		setDeleteTarget(null);

		toast.success("Patient deleted successfully");
	}

	function openEdit(patient: Patient) {
		setEditingPatient(patient);
		setIsEditModalOpen(true);
	}

	if (error) {
		return <p style={{ color: "red" }}>{error}</p>;
	}

	return (
		<div>
			<Header onAdd={() => setIsAddModalOpen(true)} />

			<section>
				{loading ? (
					<div style={grid}>
						{Array.from({
							length: PAGE_SIZE,
						}).map((_, i) => (
							<PatientCardSkeleton key={i} />
						))}
					</div>
				) : patients.length === 0 ? (
					<EmptyState setIsAddModalOpen={setIsAddModalOpen} />
				) : (
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
							{paginatedPatients.map((patient) => (
								<PatientCard
									key={patient.id}
									patient={patient}
									isOpen={expandedId === patient.id}
									onToggle={() => toggle(patient.id)}
									onEdit={openEdit}
									onDelete={() => requestDelete(patient)}
								/>
							))}
						</motion.div>
					</AnimatePresence>
				)}
			</section>

			<Pagination
				page={page}
				totalPages={totalPages}
				onPageChange={updatePage}
			/>

			{isAddModalOpen && (
				<AddPatientModal
					onSave={handleAddPatient}
					onClose={() => setIsAddModalOpen(false)}
				/>
			)}

			{isEditModalOpen && editingPatient && (
				<EditPatientModal
					patient={editingPatient}
					onUpdate={handleEditPatient}
					onClose={() => {
						setIsEditModalOpen(false);
						setEditingPatient(null);
					}}
				/>
			)}

			<ConfirmModal
				open={!!deleteTarget}
				title="Delete patient?"
				message="This will permanently remove the patient."
				onCancel={() => setDeleteTarget(null)}
				onConfirm={handleDelete}
				confirmBtnText="Delete"
			/>
		</div>
	);
}

const grid: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: 12,
	alignItems: "start",
};

export default Dashboard;
