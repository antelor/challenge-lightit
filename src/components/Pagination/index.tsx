type Props = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

function Pagination({ page, totalPages, onPageChange }: Props) {
	if (totalPages <= 1) return null;

	return (
		<div style={container}>
			<button
				onClick={() => onPageChange(Math.max(page - 1, 1))}
				disabled={page === 1}
			>
				Prev
			</button>

			<span>
				Page {page} / {totalPages}
			</span>

			<button
				onClick={() => onPageChange(Math.min(page + 1, totalPages))}
				disabled={page === totalPages}
			>
				Next
			</button>
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
