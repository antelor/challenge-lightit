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

				<div style={button} />
			</div>

			<div style={hint} />
		</div>
	);
}

const shimmer: React.CSSProperties = {
	background: "linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%)",
	backgroundSize: "400% 100%",
	animation: "shimmer 1.2s ease infinite",
	borderRadius: 8,
};

const card: React.CSSProperties = {
	padding: 12,
	border: "1px solid #e5e7eb",
	borderRadius: 12,
	marginBottom: 10,
	background: "white",
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
	width: 140,
	height: 14,
};

const lineSub: React.CSSProperties = {
	...shimmer,
	width: 90,
	height: 10,
};

const button: React.CSSProperties = {
	...shimmer,
	width: 80,
	height: 28,
};

const hint: React.CSSProperties = {
	...shimmer,
	marginTop: 12,
	height: 10,
	width: "65%",
};

export default PatientCardSkeleton;