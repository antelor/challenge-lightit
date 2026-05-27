import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useGetPatients } from "../../hooks/useGetPatients";
import type { Patient } from "../../types/types";
import PatientCard from "../../components/PatientCard";

function Dashboard() {
	const queryClient = useQueryClient();

	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

	const { data: patients = [], isLoading, isError, error } = useGetPatients();

	function handleAddPatient(newPatient: Patient) {
		queryClient.setQueryData(["patients"], (old: Patient[] = []) => [
			...old,
			newPatient,
		]);
	}

	function handleDelete(id: string) {
		queryClient.setQueryData(["patients"], (old: Patient[] = []) =>
			old.filter((p) => p.id !== id),
		);
	}

	function handleEdit(patient: Patient) {
		queryClient.setQueryData(["patients"], (old: Patient[] = []) =>
			old.map((p) =>
				p.id === patient.id ? { ...p, name: p.name + " (edited)" } : p,
			),
		);
	}

	return (
		<main>
			<header>
				<h1>Patient Dashboard</h1>

				<button
					onClick={() => {
						// example dummy add
						handleAddPatient({
							id: crypto.randomUUID(),
							name: "New Patient",
							avatar: "",
							createdAt: new Date().toISOString(),
							description: "Added locally",
							website: "https://example.com",
						});
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
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</section>
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
