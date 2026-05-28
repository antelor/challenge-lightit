type Props = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

function Modal({ open, onClose, children }: Props) {
	if (!open) return null;

	return (
		<div onClick={onClose} className="modalOverlay" style={overlay}>
			<div
				onClick={(e) => e.stopPropagation()}
				className="modalContent"
				style={modal}
			>
				{children}
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
	animation: "fadeIn 180ms ease",
};

const modal: React.CSSProperties = {
	background: "white",
	borderRadius: 12,
	width: "100%",
	maxWidth: 520,
	animation: "popIn 180ms ease",
};

export default Modal;
