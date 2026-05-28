import Button from "../Button";
import Modal from "../Modal";

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
  return (
    <Modal open={open} onClose={onCancel}>
      <div style={wrapper}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div style={actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm} variant="danger">
            {confirmBtnText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const wrapper: React.CSSProperties = {
  padding: 16,
};

const actions: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 12,
};

export default ConfirmModal;