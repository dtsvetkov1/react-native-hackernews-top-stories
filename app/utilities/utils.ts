const COUNT_LIMIT = 10;

export const getRandomElementsFromArray = (
  arr: number[],
  count = COUNT_LIMIT,
) => {
  // copy so we dont change initial array
  const tmpArray = [...arr];
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * tmpArray.length);
    const value = tmpArray.splice(randomIndex, 1)[0];
    result.push(value);
  }

  return result;
};
