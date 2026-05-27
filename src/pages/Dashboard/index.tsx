import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useGetPatients } from "../../hooks/useGetPatients";
import type { Patient, PatientFormData } from "../../types/patient";
import PatientCard from "../../components/PatientCard";
import AddPatientModal from "../../components/AddPatientModal";
import EditPatientModal from "../../components/EditPatientModal";

function Dashboard() {
	const queryClient = useQueryClient();

	const { data: patients = [], isLoading, isError, error } = useGetPatients();

	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

	function handleAddPatient(data: PatientFormData) {
		const newPatient: Patient = {
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			...data,
		};

		queryClient.setQueryData(["patients"], (old: Patient[] = []) => [
			...old,
			newPatient,
		]);

		setIsAddModalOpen(false);
	}

	function handleEditPatient(data: PatientFormData) {
		if (!editingPatient) return;

		queryClient.setQueryData(["patients"], (old: Patient[] = []) =>
			old.map((p) => (p.id === editingPatient.id ? { ...p, ...data } : p)),
		);

		setEditingPatient(null);
		setIsEditModalOpen(false);
	}

	function openEdit(patient: Patient) {
		setEditingPatient(patient);
		setIsEditModalOpen(true);
	}

	return (
		<main>
			<header>
				<h1>Patient Dashboard</h1>

				<button onClick={() => setIsAddModalOpen(true)}>Add Patient</button>
			</header>

			{isLoading && <p>Loading...</p>}
			{isError && <p>{(error as Error).message}</p>}

			{!isLoading && !isError && (
				<section>
					{patients.map((patient: Patient) => (
						<PatientCard
							key={patient.id}
							patient={patient}
							onView={setSelectedPatient}
							onEdit={openEdit}
							onDelete={(id) =>
								queryClient.setQueryData(["patients"], (old: Patient[] = []) =>
									old.filter((p) => p.id !== id),
								)
							}
						/>
					))}
				</section>
			)}

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

			{selectedPatient && (
				<dialog open>
					<h2>{selectedPatient.name}</h2>

					<img
						src={selectedPatient.avatar}
						alt={selectedPatient.name}
						width={80}
						height={80}
					/>

					<p>{selectedPatient.description}</p>

					<a href={selectedPatient.website} target="_blank" rel="noreferrer">
						Visit Website
					</a>

					<p>Created: {new Date(selectedPatient.createdAt).toLocaleString()}</p>

					<button onClick={() => setSelectedPatient(null)}>Close</button>
				</dialog>
			)}
		</main>
	);
}

export default Dashboard;
