interface UsePagination {
  page: number;
  amountOfPages: number;
}

export const usePagination = ({ page, amountOfPages }: UsePagination) => {
  const isLastPage = page - 1 >= amountOfPages;

  if (page < 2) {
    return {
      from: 0,
      to: 69,
      isLastPage,
    };
  }
  const to = page * 69 + page;
  const from = to - 70;

  console.log("to", to);

  return {
    isLastPage,
    from,
    to,
  };
};
