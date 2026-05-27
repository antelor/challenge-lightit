import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import type { Patient, PatientFormData } from "../../types/patient";
import PatientCard from "../../components/PatientCard";
import PatientCardSkeleton from "../../components/PatientCardSkeleton";
import AddPatientModal from "../../components/AddPatientModal";
import EditPatientModal from "../../components/EditPatientModal";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import { normalizePatientFormData } from "./utils";
import EmptyState from "../../components/EmptyState";
import ConfirmModal from "../../components/ConfirmModal";
import toast from "react-hot-toast";

function Dashboard() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const [searchParams, setSearchParams] = useSearchParams();

	const [deleteTarget, setDeleteTarget] = useState<Patient | null>(null);

	const rawPage = searchParams.get("page");

	const parsedPage = Number(rawPage);

	const page =
		Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : 1;

	const pageSize = 10;

	function toggle(id: string) {
		setExpandedId((prev) => (prev === id ? null : id));
	}

	useEffect(() => {
		async function loadPatients() {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch(import.meta.env.VITE_API_URL);

				if (!res.ok) throw new Error("Failed to fetch patients");

				const data: Patient[] = await res.json();

				const normalized = data.map((p) => ({
					...p,
					website:
						typeof p.website === "string" && p.website.trim().length > 0
							? p.website.startsWith("http://") ||
								p.website.startsWith("https://")
								? p.website
								: `https://${p.website}`
							: "#",
				}));

				setPatients(normalized);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Something went wrong");
			} finally {
				setLoading(false);
			}
		}

		loadPatients();
	}, []);

	const sortedPatients = useMemo(() => {
		return [...patients].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);
	}, [patients]);

	const totalPages = Math.ceil(sortedPatients.length / pageSize);

	const paginatedPatients = sortedPatients.slice(
		(page - 1) * pageSize,
		page * pageSize,
	);

	useEffect(() => {
		if (page > totalPages && totalPages > 0) {
			setSearchParams({ page: "1" });
		}
	}, [page, totalPages, setSearchParams]);

	function updatePage(page: number) {
		setSearchParams({ page: String(page) });
	}

	function handleAddPatient(data: PatientFormData) {
		const cleanData = normalizePatientFormData(data);

		const newPatient: Patient = {
			id: crypto.randomUUID(),
			createdAt: new Date().toISOString(),
			...cleanData,
		};

		setPatients((prev) => [...prev, newPatient]);

		setSearchParams({ page: "1" });

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

	function requestDelete(patient: Patient) {
		setDeleteTarget(patient);
	}

	function handleDelete() {
		if (!deleteTarget) return;

		setPatients((prev) => prev.filter((p) => p.id !== deleteTarget.id));
		setDeleteTarget(null);
		toast.success("Patient deleted successfully");
	}

	function openEdit(patient: Patient) {
		setEditingPatient(patient);
		setIsEditModalOpen(true);
	}

	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<Header onAdd={() => setIsAddModalOpen(true)} />

			<section>
				{loading ? (
					<div style={grid}>
						{Array.from({ length: 10 }).map((_, i) => (
							<PatientCardSkeleton key={i} />
						))}
					</div>
				) : sortedPatients.length === 0 ? (
					<EmptyState setIsAddModalOpen={setIsAddModalOpen} />
				) : (
					<AnimatePresence mode="wait">
						<motion.div
							style={grid}
							key={`${page}-${sortedPatients.length}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.2 }}
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
