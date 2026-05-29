import { useState } from "react";
import type { Patient, PatientFormData } from "../../types/patient";
import AddPatientModal from "../../components/AddPatientModal";
import ConfirmModal from "../../components/ConfirmModal";
import EditPatientModal from "../../components/EditPatientModal";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";
import PatientsGrid from "../../components/PatientsGrid";
import { usePagination } from "../../hooks/usePagination";
import { usePatients } from "../../hooks/usePatients";
import ErrorState from "../../components/ErrorState";

const PAGE_SIZE = 18;

function Dashboard() {
	const { patients, loading, error, addPatient, editPatient, deletePatient } =
		usePatients();

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
		if (editingPatient === null) return;
		editPatient(editingPatient.id, data);
		setEditingPatient(null);
	}

	function openEdit(patient: Patient) {
		setEditingPatient(patient);
	}

	function closeEdit() {
		setEditingPatient(null);
	}

	function requestDelete(patient: Patient) {
		setDeleteTarget(patient);
	}

	function handleDelete() {
		if (deleteTarget === null) return;
		deletePatient(deleteTarget.id);
		setDeleteTarget(null);
		toast.success("Patient deleted successfully");
	}

	if (error) {
		return <ErrorState message={error} />;
	}

	return (
		<div>
			<Header onAdd={() => setIsAddModalOpen(true)} />

			<section>
				<PatientsGrid
					loading={loading}
					patients={paginatedPatients}
					page={page}
					pageSize={PAGE_SIZE}
					expandedId={expandedId}
					onToggle={toggle}
					onEdit={openEdit}
					onDelete={requestDelete}
					setIsAddModalOpen={setIsAddModalOpen}
				/>
			</section>

			<Pagination
				page={page}
				totalPages={totalPages}
				onPageChange={updatePage}
			/>

			<AddPatientModal
				open={isAddModalOpen}
				onSave={handleAddPatient}
				onClose={() => setIsAddModalOpen(false)}
			/>

			<EditPatientModal
				open={editingPatient !== null}
				patient={editingPatient}
				onUpdate={handleEditPatient}
				onClose={closeEdit}
			/>

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

export default Dashboard;
