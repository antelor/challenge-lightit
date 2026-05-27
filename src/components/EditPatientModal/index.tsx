import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Patient, PatientFormData } from "../../types/patient";
import PatientForm from "../PatientForm";
import { toast } from "react-hot-toast";

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
	}

	function onError() {
		toast.error("Error editing patient");
	}


	return (
		<div style={overlay}>
			<div style={modal}>
				<h2>Edit Patient</h2>

				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<PatientForm register={register} errors={errors} />

					<button type="submit">Update</button>
					<button type="button" onClick={onClose}>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
}

const overlay: React.CSSProperties = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.5)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

const modal: React.CSSProperties = {
	background: "white",
	padding: 20,
	borderRadius: 8,
	minWidth: 320,
};

export default EditPatientModal;
