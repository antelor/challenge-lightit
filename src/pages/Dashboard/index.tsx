import { useEffect, useState } from "react";

import type { Patient, PatientFormData } from "../../types/patient";
import PatientCard from "../../components/PatientCard";
import AddPatientModal from "../../components/AddPatientModal";
import EditPatientModal from "../../components/EditPatientModal";
import { normalizePatientFormData } from "../../utils/formUtils";

function Dashboard() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

	useEffect(() => {
		async function loadPatients() {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch(import.meta.env.VITE_API_URL);

				if (!res.ok) {
					throw new Error("Failed to fetch patients");
				}

				const data: Patient[] = await res.json();
				setPatients(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong");
			} finally {
				setLoading(false);
			}
		}

		loadPatients();
	}, []);

	function handleAddPatient(data: PatientFormData) {
		const cleanData = normalizePatientFormData(data);
    
		const newPatient: Patient = {
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			...cleanData,
		};

		setPatients((prev) => [...prev, newPatient]);
		setIsAddModalOpen(false);
	}

	function handleEditPatient(data: PatientFormData) {
		if (!editingPatient) return;

		setPatients((prev) =>
			prev.map((p) => (p.id === editingPatient.id ? { ...p, ...data } : p)),
		);

		setEditingPatient(null);
		setIsEditModalOpen(false);
	}

	function handleDelete(id: string) {
		setPatients((prev) => prev.filter((p) => p.id !== id));
	}

	function openEdit(patient: Patient) {
		setEditingPatient(patient);
		setIsEditModalOpen(true);
	}

	if (loading) return <p>Loading patients...</p>;

	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<main>
			<header>
				<h1>Patient Dashboard</h1>

				<button onClick={() => setIsAddModalOpen(true)}>Add Patient</button>
			</header>

			<section>
				{patients.map((patient) => (
					<PatientCard
						key={patient.id}
						patient={patient}
						onView={setSelectedPatient}
						onEdit={openEdit}
						onDelete={handleDelete}
					/>
				))}
			</section>

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
