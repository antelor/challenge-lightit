import "../../styles/animations.css";

function PatientCardSkeleton() {
	return (
		<div style={card}>
			<div style={header}>
				<div style={left}>
					<div style={avatar} />
					<div style={textBlock}>
						<div style={lineName} />
						<div style={lineSub} />
					</div>
				</div>

				<div style={btn} />
			</div>

			<div style={collapsedHint} />
		</div>
	);
}

const shimmer: React.CSSProperties = {
	background: "linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%)",
	backgroundSize: "400% 100%",
	animation: "shimmer 1.4s ease infinite",
	borderRadius: 6,
};

const card: React.CSSProperties = {
	padding: 12,
	border: "1px solid #eee",
	borderRadius: 12,
	marginBottom: 10,
	height: "fit-content",
};

const header: React.CSSProperties = {
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const left: React.CSSProperties = {
	display: "flex",
	gap: 10,
	alignItems: "center",
};

const avatar: React.CSSProperties = {
	...shimmer,
	width: 40,
	height: 40,
	borderRadius: "50%",
};

const textBlock: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 6,
};

const lineName: React.CSSProperties = {
	...shimmer,
	width: 120,
	height: 14,
};

const lineSub: React.CSSProperties = {
	...shimmer,
	width: 70,
	height: 10,
};

const btn: React.CSSProperties = {
	...shimmer,
	width: 80,
	height: 28,
};

const collapsedHint: React.CSSProperties = {
	...shimmer,
	marginTop: 12,
	height: 10,
	width: "60%",
};

export default PatientCardSkeleton;