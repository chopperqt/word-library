export const getPaginationRange = (page: number) => {
  if (page < 2) {
    return {
      from: 0,
      to: 69,
    };
  }

  const to = page * 70 - 1;
  const from = to - 69;

  console.log("to: ", page * 70 + page);

  return {
    to,
    from,
  };
};
