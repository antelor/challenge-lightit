import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { Patient, PatientFormData } from "../../types/patient";
import PatientForm from "../PatientForm";
import Button from "../Button";

type Props = {
	patient: Patient;
	onUpdate: (data: PatientFormData) => void;
	onClose: () => void;
};

function EditPatientModal({ patient, onUpdate, onClose }: Props) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PatientFormData>();

	useEffect(() => {
		reset({
			name: patient.name,
			avatar: patient.avatar,
			description: patient.description,
			website: patient.website,
		});
	}, [patient, reset]);

	function onSubmit(data: PatientFormData) {
		onUpdate(data);
		toast.success("Patient edited successfully");
		onClose();
	}

	function onError() {
		toast.error("Error editing patient");
	}

	return (
		<div style={overlay} onClick={onClose}>
			<div style={modal} onClick={(e) => e.stopPropagation()}>
				<div style={header}>
					<h2 style={title}>Edit Patient</h2>
				</div>

				<form style={form} onSubmit={handleSubmit(onSubmit, onError)}>
					<div style={content}>
						<PatientForm register={register} errors={errors} />
					</div>

					<div style={footer}>
						<Button type="button" variant="danger" onClick={onClose}>
							Cancel
						</Button>

						<Button type="submit" variant="primary">
							Update Patient
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

const overlay: React.CSSProperties = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.55)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: 16,
	zIndex: 50,
};

const modal: React.CSSProperties = {
	background: "white",
	borderRadius: 12,
	width: "100%",
	maxWidth: 520,
	boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
	overflow: "hidden",
};

const header: React.CSSProperties = {
	padding: "16px 18px",
	borderBottom: "1px solid #e5e7eb",
};

const title: React.CSSProperties = {
	margin: 0,
	fontSize: 18,
	fontWeight: 600,
};

const form: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	width: "100%",
};

const content: React.CSSProperties = {
	padding: 18,
	display: "flex",
	flexDirection: "column",
	gap: 14,
};

const footer: React.CSSProperties = {
	display: "flex",
	justifyContent: "flex-end",
	gap: 10,
	padding: 16,
	borderTop: "1px solid #e5e7eb",
};

export default EditPatientModal;
