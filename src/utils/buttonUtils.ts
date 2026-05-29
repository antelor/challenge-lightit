import type { Variant } from "../types/buttons";

export function getVariantStyle(variant: Variant): React.CSSProperties {
	switch (variant) {
		case "primary":
			return {
				background: "#eef2ff",
				color: "#1e3a8a",
				border: "1px solid #c7d2fe",
			};

		case "secondary":
			return {
				background: "#ffffff",
				color: "#111827",
				border: "1px solid #e5e7eb",
			};

		case "danger":
			return {
				background: "#fef2f2",
				color: "#991b1b",
				border: "1px solid #fecaca",
			};
	}
}