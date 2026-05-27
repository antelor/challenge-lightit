import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useGetPatients } from "../../hooks/useGetPatients";
import { usePatientForm } from "../../hooks/usePatientForm";

import type { Patient } from "../../types/patient";
import PatientCard from "../../components/PatientCard";

import AddPatientModal from "../../components/AddPatientModal";
import EditPatientModal from "../../components/EditPatientModal";

function Dashboard() {
	const queryClient = useQueryClient();

	const {
		data: patients = [],
		isLoading,
		isError,
		error,
	} = useGetPatients();

	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const { formData, setFormData, resetForm, fillForm } = usePatientForm();

	function handleAddPatient() {
		const newPatient: Patient = {
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			...formData,
		};

console.log("ADDING:", formData);
		queryClient.setQueryData(["patients"], (old: Patient[] = []) => [
			...old,
			newPatient,
		]);

		resetForm();
		setIsAddModalOpen(false);
	}

	function handleEditPatient() {
		if (!selectedPatient) return;

		queryClient.setQueryData(["patients"], (old: Patient[] = []) =>
			old.map((p) =>
				p.id === selectedPatient.id
					? { ...p, ...formData }
					: p
			)
		);

		resetForm();
		setSelectedPatient(null);
		setIsEditModalOpen(false);
	}

	function openEdit(patient: Patient) {
		fillForm(patient);
		setSelectedPatient(patient);
		setIsEditModalOpen(true);
	}

	return (
		<main>
			<header>
				<h1>Patient Dashboard</h1>

				<button
					onClick={() => {
						resetForm();
						setIsAddModalOpen(true);
					}}
				>
					Add Patient
				</button>
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
								queryClient.setQueryData(
									["patients"],
									(old: Patient[] = []) =>
										old.filter((p) => p.id !== id)
								)
							}
						/>
					))}
				</section>
			)}

			{isAddModalOpen && (
				<AddPatientModal
					formData={formData}
					setFormData={setFormData}
					onSave={handleAddPatient}
					onClose={() => setIsAddModalOpen(false)}
				/>
			)}

			{isEditModalOpen && (
				<EditPatientModal
					formData={formData}
					setFormData={setFormData}
					onUpdate={handleEditPatient}
					onClose={() => {
						setIsEditModalOpen(false);
						setSelectedPatient(null);
						resetForm();
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

					<a
						href={selectedPatient.website}
						target="_blank"
						rel="noreferrer"
					>
						Visit Website
					</a>

					<p>
						Created:{" "}
						{new Date(selectedPatient.createdAt).toLocaleString()}
					</p>

					<button onClick={() => setSelectedPatient(null)}>
						Close
					</button>
				</dialog>
			)}
		</main>
	);
}

export default Dashboard;