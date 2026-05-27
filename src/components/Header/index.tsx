import Button from "../Button";

type Props = {
	onAdd: () => void;
};

function Header({ onAdd }: Props) {
	return (
		<header style={header}>
			<h1 style={title}>Patient Dashboard</h1>

			<Button variant="primary" onClick={onAdd}>
				Add Patient
			</Button>
		</header>
	);
}

const header: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: "12px 0",
	backgroundColor: "#f9fafb",
	borderBottom: "1px solid #e5e7eb",
	marginBottom: 16,
};

const title: React.CSSProperties = {
	margin: 0,
	fontSize: "20px",
	fontWeight: 600,
};

export default Header;
