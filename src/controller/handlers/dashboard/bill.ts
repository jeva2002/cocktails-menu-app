export const getTotal = (totalList: number[] | undefined) => {
  if (totalList) {
    return totalList.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  }
};
