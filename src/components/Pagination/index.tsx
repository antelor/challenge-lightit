import Button from "../Button";

type Props = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

function Pagination({ page, totalPages, onPageChange }: Props) {
	if (totalPages <= 1) return null;

	return (
		<div style={container}>
			<Button
				onClick={() => onPageChange(Math.max(page - 1, 1))}
				disabled={page === 1}
			>
				Prev
			</Button>

			<span>
				Page {page} / {totalPages}
			</span>

			<Button
				onClick={() => onPageChange(Math.min(page + 1, totalPages))}
				disabled={page === totalPages}
			>
				Next
			</Button>
		</div>
	);
}

const container: React.CSSProperties = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	gap: 12,
	marginTop: 16,
};

export default Pagination;
