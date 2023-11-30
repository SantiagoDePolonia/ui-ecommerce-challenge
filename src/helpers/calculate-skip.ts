export const calculateSkip = (limit: number, currentPage: number) => {
  return limit * (currentPage - 1);
};
