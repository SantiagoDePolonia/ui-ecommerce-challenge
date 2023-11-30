export const getPaginationControls = (
  pageSize: number,
  currentPage: number,
  totalCount: number,
) => {
  if (!totalCount) return { pageStart: 0, pageEnd: 0 };

  const pageStart = (currentPage - 1) * pageSize + 1;
  const pageEnd = Math.min(pageStart + pageSize - 1, totalCount);

  return { pageStart, pageEnd };
};
