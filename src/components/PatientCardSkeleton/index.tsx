import "../../styles/animations.css";

function PatientCardSkeleton() {
	return (
		<div style={card}>
			<div style={header}>
				<div style={lineShort} />
				<div style={actions}>
					<div style={btn} />
					<div style={btn} />
					<div style={btn} />
				</div>
			</div>

			<div style={body}>
				<div style={avatar} />
				<div style={lines}>
					<div style={lineLong} />
					<div style={lineMedium} />
				</div>
			</div>
		</div>
	);
}

const shimmer = {
	background: "linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%)",
	backgroundSize: "400% 100%",
	animation: "shimmer 1.4s ease infinite",
};

const card: React.CSSProperties = {
	padding: 12,
	border: "1px solid #eee",
	borderRadius: 8,
	marginBottom: 10,
};

const header: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const actions: React.CSSProperties = {
	display: "flex",
	gap: 8,
};

const base = {
	...shimmer,
	borderRadius: 6,
};

const btn: React.CSSProperties = {
	...base,
	width: 50,
	height: 24,
};

const avatar: React.CSSProperties = {
	...base,
	width: 50,
	height: 50,
	borderRadius: "50%",
};

const body: React.CSSProperties = {
	display: "flex",
	gap: 12,
	marginTop: 12,
};

const lines: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 8,
	flex: 1,
};

const lineShort: React.CSSProperties = {
	...base,
	width: 120,
	height: 16,
};

const lineLong: React.CSSProperties = {
	...base,
	width: "80%",
	height: 12,
};

const lineMedium: React.CSSProperties = {
	...base,
	width: "60%",
	height: 12,
};

export default PatientCardSkeleton;