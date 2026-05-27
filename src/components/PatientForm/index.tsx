import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PatientFormData } from "../../types/patient";

type Props = {
	register: UseFormRegister<PatientFormData>;
	errors: FieldErrors<PatientFormData>;
};

function PatientForm({ register, errors }: Props) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<div>
				<input
					placeholder="Name"
					{...register("name", {
						required: "Name is required",
						validate: {
							maxLength: (value) => value.trim().length <= 30 || "Name is too long",
						},
					})}
				/>
				{errors.name && <small>{errors.name.message}</small>}
			</div>

			<div>
				<input
					placeholder="Avatar"
					{...register("avatar", {
						required: "Avatar is required",
						validate: {
							minLength: (value) => value.trim().length >= 3 || "URL is too short",

							hasDot: (value) =>
								value.includes(".") || "URL must contain a dot (e.g. google.com)",
						},
					})}
				/>
				{errors.avatar && <small>{errors.avatar.message}</small>}
			</div>

			<div>
				<textarea
					placeholder="Description"
					{...register("description", {
						required: "Description is required",
					})}
				/>
				{errors.description && <small>{errors.description.message}</small>}
			</div>

			<div>
				<input
					placeholder="Website"
					{...register("website", {
						required: "Website is required",
						validate: {
							minLength: (value) => value.trim().length >= 3 || "URL is too short",

							hasDot: (value) =>
								value.includes(".") || "URL must contain a dot (e.g. google.com)",
						},
					})}
				/>
				{errors.website && <small>{errors.website.message}</small>}
			</div>
		</div>
	);
}

export default PatientForm;
