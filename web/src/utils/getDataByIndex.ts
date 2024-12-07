type getDataIndex = {
  totalPage: number;
  array: number[];
  pos_index: number;
};

export function getDataByIndex(
  indexData: number,
  perPage: number,
  lengthData: number,
  page: number | null,
): getDataIndex {
  let lastNumber = 0;
  const calcMainPage = (lengthData - (lengthData % perPage)) / perPage;

  const calcModulusPage = lengthData % perPage;

  const arrays: number[][] = [];

  for (let i = 0; i < calcMainPage; i++) {
    const array = Array.from({ length: perPage }, (_, n) => n + lastNumber);
    arrays.push(array);
    lastNumber = array[array.length - 1] + 1;
  }

  if (calcModulusPage !== 0) {
    const array = Array.from(
      { length: calcModulusPage },
      (_, n) => n + lastNumber,
    );

    arrays.push(array);
  }

  if (page === null) {
    for (let i = 0; i < arrays.length; i++) {
      const array = arrays[i];
      const indexPosition = array.indexOf(indexData);

      if (indexPosition !== -1) {
        return {
          array: array,
          totalPage: calcMainPage + 1,
          pos_index: i,
        };
      }
    }

    return {
      array: [],
      totalPage: 0,
      pos_index: 0,
    };
  }

  if (page !== null) {
    return {
      array: arrays[page] ?? [],
      totalPage: arrays.length ?? 0,
      pos_index: page,
    };
  }

  return {
    array: [],
    totalPage: 0,
    pos_index: 0,
  };
}
