import { useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import { getVariantStyle } from "../../utils/buttonUtils";
import type { Variant } from "../../types/buttons";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
};

function Button({ variant = "secondary", style, disabled, ...props }: Props) {
	const [hovered, setHovered] = useState(false);

	const combinedStyle: React.CSSProperties = {
		...base,
		...getVariantStyle(variant, hovered),
		...style,
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? 0.5 : 1,
	};

	return (
		<button
			{...props}
			style={combinedStyle}
			disabled={disabled}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		/>
	);
}

const base: React.CSSProperties = {
	padding: "6px 10px",
	borderRadius: 8,
	border: "1px solid transparent",
	fontSize: 13,
	fontWeight: 500,
	cursor: "pointer",
	transition: "all 0.15s ease",
};

export default Button;
