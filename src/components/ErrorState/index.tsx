type Props = {
	message: string;
};

function ErrorState({ message }: Props) {
	return (
		<div style={container}>
			<p style={text}>{message}</p>
		</div>
	);
}

const container: React.CSSProperties = {
	height: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const text: React.CSSProperties = {
	color: "#ef4444",
	fontSize: 16,
	fontWeight: 500,
};

export default ErrorState;