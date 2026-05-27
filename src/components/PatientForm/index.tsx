import type { PatientFormData } from "../../types/patient";

type Props = {
	formData: PatientFormData;
	setFormData: (data: PatientFormData) => void;
};

function PatientForm({ formData, setFormData }: Props) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<input
				placeholder="Name"
				value={formData.name}
				onChange={(e) => setFormData({ ...formData, name: e.target.value })}
			/>

			<input
				placeholder="Avatar"
				value={formData.avatar}
				onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
			/>

			<textarea
				placeholder="Description"
				value={formData.description}
				onChange={(e) =>
					setFormData({ ...formData, description: e.target.value })
				}
			/>

			<input
				placeholder="Website"
				value={formData.website}
				onChange={(e) => setFormData({ ...formData, website: e.target.value })}
			/>
		</div>
	);
}

export default PatientForm;
