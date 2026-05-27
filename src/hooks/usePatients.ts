import { useEffect, useMemo, useState } from "react";

import type {
	Patient,
	PatientFormData,
} from "../types/patient";

import { normalizePatientFormData } from "../utils/formUtils";
import { normalizeWebsite } from "../utils/patientUtils";

export function usePatients() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadPatients() {
			try {
				setLoading(true);
				setError(null);

				if (!import.meta.env.VITE_API_URL) {
					throw new Error("Missing API URL");
				}

				const res = await fetch(import.meta.env.VITE_API_URL);

				if (!res.ok) {
					throw new Error("Failed to fetch patients");
				}

				const data: Patient[] = await res.json();

				const safeData = Array.isArray(data) ? data : [];

				const normalized: Patient[] = safeData.map((p) => ({
					...p,
					website: normalizeWebsite(p?.website ?? ""),
				}));
				
				
				setPatients(normalized);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Something went wrong",
				);
			} finally {
				setLoading(false);
			}
		}

		loadPatients();
	}, []);

	const sortedPatients = useMemo(() => {
		return [...patients].sort((a, b) => {
			const aTime = Date.parse(a.createdAt ?? "") || 0;
			const bTime = Date.parse(b.createdAt ?? "") || 0;

			return bTime - aTime;
		});
	}, [patients]);

	function addPatient(data: PatientFormData) {
		const cleanData = normalizePatientFormData(data);

		const newPatient: Patient = {
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			...cleanData,
		};

		setPatients((prev) => [...prev, newPatient]);
	}

	function editPatient(id: string, data: PatientFormData) {
		const cleanData = normalizePatientFormData(data);

		setPatients((prev) =>
			prev.map((p) =>
				p.id === id
					? { ...p, ...cleanData }
					: p,
			),
		);
	}
	
	function deletePatient(id: string) {
		setPatients((prev) =>
			prev.filter((p) => p.id !== id),
		);
	}

	return {
		patients: sortedPatients,
		loading,
		error,
		addPatient,
		editPatient,
		deletePatient,
	};
}