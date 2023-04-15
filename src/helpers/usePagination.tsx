interface UsePagination {
  page: number;
  amountOfPages: number;
}

export const usePagination = ({ page, amountOfPages }: UsePagination) => {
  const isLastPage = page - 1 >= amountOfPages;

  if (page < 2) {
    return {
      from: 0,
      to: 70,
      isLastPage,
    }
  }
  const to = page * 70 + (page - 1);
  const from = to - 70;
  
  return {
    isLastPage,
    from,
    to,
  };
};
