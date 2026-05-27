import { useState } from "react";

type Props = {
	name: string;
	src?: string;
	size?: number;
};

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

function Avatar({ name, src, size = 50 }: Props) {
	const [imgError, setImgError] = useState(false);
	const initials = getInitials(name);

	const dynamicStyle: React.CSSProperties = {
		width: size,
		height: size,
		fontSize: size * 0.35,
	};

	return (
		<div style={{ ...baseAvatarStyle, ...dynamicStyle }}>
			{src && !imgError ? (
				<img
					src={src}
					alt={name}
					onError={() => setImgError(true)}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						display: "block",
					}}
				/>
			) : (
				<div>{initials}</div>
			)}
		</div>
	);
}

const baseAvatarStyle: React.CSSProperties = {
	borderRadius: "50%",
	backgroundColor: "#e5e7eb",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontWeight: 600,
	color: "#374151",
	overflow: "hidden",
	flexShrink: 0,
};

export default Avatar;
