import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type Params<T> = {
	items: T[];
	pageSize?: number;
};

export function usePagination<T>({
	items,
	pageSize = 10,
}: Params<T>) {
	const [searchParams, setSearchParams] = useSearchParams();

	const rawPage = searchParams.get("page");

	const parsedPage = Number(rawPage);

	const page =
		Number.isFinite(parsedPage) && parsedPage > 0
			? Math.floor(parsedPage)
			: 1;

	const totalPages = Math.ceil(items.length / pageSize);

	useEffect(() => {
		if (page > totalPages && totalPages > 0) {
			setSearchParams({ page: "1" });
		}
	}, [page, totalPages, setSearchParams]);

	const paginated = useMemo(() => {
		return items.slice(
			(page - 1) * pageSize,
			page * pageSize,
		);
	}, [items, page, pageSize]);

	function updatePage(nextPage: number) {
		setSearchParams({ page: String(nextPage) });
	}

    function resetPage() {
	    setSearchParams({ page: "1" });
    }

	return {
		page,
		totalPages,
		paginated,
		updatePage,
        resetPage,
	};
}