import type { Dispatch, SetStateAction } from "react";
import Button from "../Button";

function EmptyState({
	setIsAddModalOpen,
}: {
	setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div style={emptyState}>
			<h3>No patients found</h3>
			<p>Start by adding your first patient.</p>
			<Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
				Add Patient
			</Button>
		</div>
	);
}

const emptyState: React.CSSProperties = {
	textAlign: "center",
	padding: "40px 20px",
	border: "1px dashed #ddd",
	borderRadius: 8,
	marginTop: 20,
	color: "#666",
};

export default EmptyState;
