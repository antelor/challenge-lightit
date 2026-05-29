import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { PatientFormData } from "../../types/patient";

type Props = {
	register: UseFormRegister<PatientFormData>;
	errors: FieldErrors<PatientFormData>;
};

function PatientForm({ register, errors }: Props) {
	return (
		<div style={form}>
			<div style={field}>
				<input
					style={input}
					placeholder="Name"
					{...register("name", {
						required: "Name is required",
						validate: {
							maxLength: (value) =>
								value.trim().length <= 30 || "Name is too long",
						},
					})}
				/>
				{errors.name && <span style={error}>{errors.name.message}</span>}
			</div>

			<div style={field}>
				<input
					style={input}
					placeholder="Avatar"
					{...register("avatar", {
						required: "Avatar is required",
						validate: {
							minLength: (value) =>
								value.trim().length >= 3 || "URL is too short",
							hasDot: (value) =>
								value.includes(".") ||
								"URL must contain a dot (e.g. google.com)",
						},
					})}
				/>
				{errors.avatar && <span style={error}>{errors.avatar.message}</span>}
			</div>

			<div style={field}>
				<textarea
					style={textarea}
					placeholder="Description"
					{...register("description", {
						required: "Description is required",
					})}
				/>
				{errors.description && (
					<span style={error}>{errors.description.message}</span>
				)}
			</div>

			<div style={field}>
				<input
					style={input}
					placeholder="Website"
					{...register("website", {
						required: "Website is required",
						validate: {
							minLength: (value) =>
								value.trim().length >= 3 || "URL is too short",
							hasDot: (value) =>
								value.includes(".") ||
								"URL must contain a dot (e.g. google.com)",
						},
					})}
				/>
				{errors.website && <span style={error}>{errors.website.message}</span>}
			</div>
		</div>
	);
}

const form: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 14,
	width: "100%",
};

const field: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 6,
	width: "100%",
};

const input: React.CSSProperties = {
	width: "100%",
	padding: "8px 10px",
	border: "1px solid #e5e7eb",
	borderRadius: 8,
	outline: "none",
	boxSizing: "border-box",
};

const textarea: React.CSSProperties = {
	width: "100%",
	padding: "8px 10px",
	border: "1px solid #e5e7eb",
	borderRadius: 8,
	resize: "vertical",
	outline: "none",
	minHeight: 120,
	boxSizing: "border-box",
};

const error: React.CSSProperties = {
	fontSize: 12,
	color: "#ef4444",
	display: "block",
	marginLeft: 4,
};

export default PatientForm;
