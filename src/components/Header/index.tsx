type Props = {
  onAdd: () => void;
};

function Header({ onAdd }: Props) {
  return (
    <header style={header}>
      <h1>Patient Dashboard</h1>

      <button onClick={onAdd}>Add Patient</button>
    </header>
  );
}

const header: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

export default Header;