export function useMergeSort(array, setArray, setActive, setSwap, setSorted) {
  return async function mergeSort(speed = 100, onFinish = null) {
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));
    const arr = [...array];

    async function merge(l, m, r) {
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);

      let i = 0, j = 0, k = l;

      while (i < left.length && j < right.length) {
        // marca os elementos ativos
        setActive(new Set([k]));
        await sleep(speed);

        if (left[i] <= right[j]) {
          setSwap(new Set([k]));
          arr[k] = left[i];
          i++;
        } else {
          setSwap(new Set([k]));
          arr[k] = right[j];
          j++;
        }

        setArray([...arr]);
        await sleep(speed);
        setSwap(new Set());
        k++;
      }

      // copia o restante da esquerda
      while (i < left.length) {
        setActive(new Set([k]));
        await sleep(speed);

        setSwap(new Set([k]));
        arr[k] = left[i];
        setArray([...arr]);

        await sleep(speed);
        setSwap(new Set());

        i++;
        k++;
      }

      // copia o restante da direita
      while (j < right.length) {
        setActive(new Set([k]));
        await sleep(speed);

        setSwap(new Set([k]));
        arr[k] = right[j];
        setArray([...arr]);

        await sleep(speed);
        setSwap(new Set());

        j++;
        k++;
      }

      setActive(new Set());
    }

    async function mergeSortRecursive(l, r) {
      if (l >= r) return;

      const m = Math.floor((l + r) / 2);

      await mergeSortRecursive(l, m);
      await mergeSortRecursive(m + 1, r);
      await merge(l, m, r);
    }

    // executa o merge sort
    await mergeSortRecursive(0, arr.length - 1);

    // marca tudo como ordenado
    const sorted = new Set();
    for (let i = 0; i < arr.length; i++) sorted.add(i);
    setSorted(sorted);

    if (onFinish) onFinish();
  };
}
