import type { ButtonHTMLAttributes } from "react";
import type { Variant } from "../../types/buttons";
import { getVariantStyle } from "../../utils/buttonUtils";
import "./styles.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
};

function Button({
	variant = "secondary",
	style,
	disabled,
	type = "button",
	children,
	...props
}: Props) {
	const combinedStyle: React.CSSProperties = {
		...getVariantStyle(variant),
		...style,
		opacity: disabled ? 0.5 : 1,
	};

	return (
		<button
			{...props}
			type={type}
			disabled={disabled}
			style={combinedStyle}
			className="button"
		>
			{children}
		</button>
	);
}

export default Button;
