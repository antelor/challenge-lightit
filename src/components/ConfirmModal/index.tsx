import Button from "../Button";

type Props = {
	open: boolean;
	title: string;
	message: string;
	confirmBtnText: string;
	onConfirm: () => void;
	onCancel: () => void;
};

function ConfirmModal({
	open,
	title,
	message,
	confirmBtnText,
	onConfirm,
	onCancel,
}: Props) {
	if (!open) return null;

	return (
		<div style={overlay}>
			<div style={modal}>
				<h3>{title}</h3>
				<p>{message}</p>

				<div style={actions}>
					<Button onClick={onCancel}>Cancel</Button>
					<Button onClick={onConfirm} variant="danger">
						{confirmBtnText}
					</Button>
				</div>
			</div>
		</div>
	);
}

const overlay: React.CSSProperties = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.4)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

const modal: React.CSSProperties = {
	background: "white",
	padding: 16,
	borderRadius: 12,
	width: 320,
};

const actions: React.CSSProperties = {
	display: "flex",
	justifyContent: "flex-end",
	gap: 8,
	marginTop: 12,
};

export default ConfirmModal;
