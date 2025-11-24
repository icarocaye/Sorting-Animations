// hooks/useQuickSort.js
export function useQuickSort(
  array,
  setArray,
  setPivot,
  setLeftPtr,
  setRightPtr,
  setSwap,
  setSorted
) {
  async function quickSort(speed = 100, onFinish = null) {
    const arr = [...array];
    const sorted = new Set();
    const sleep = (t) => new Promise((r) => setTimeout(r, t));

    async function partition(left, right) {
      const mid = Math.floor((left + right) / 2);
      const pivot = arr[mid];

      let i = left;
      let j = right;

      setPivot(mid); // marca pivô

      while (i <= j) {
        setLeftPtr(i);
        setRightPtr(j);
        await sleep(speed);

        while (arr[i] < pivot) {
          i++;
          setLeftPtr(i);
          await sleep(speed);
        }

        while (arr[j] > pivot) {
          j--;
          setRightPtr(j);
          await sleep(speed);
        }

        if (i <= j) {
          setSwap(new Set([i, j]));
          await sleep(speed);

          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);

          await sleep(speed);
          setSwap(new Set());

          i++;
          j--;
        }
      }

      // Limpando ponteiros
      setLeftPtr(null);
      setRightPtr(null);

      return i;
    }

    async function qs(left, right) {
      if (left >= right) {
        if (left === right) {
          sorted.add(left);
          setSorted(new Set(sorted));
        }
        return;
      }

      const index = await partition(left, right);

      await qs(left, index - 1);
      await qs(index, right);

      for (let k = left; k <= right; k++) sorted.add(k);
      setSorted(new Set(sorted));

      setPivot(null);
    }

    await qs(0, arr.length - 1);
    if (onFinish) onFinish();
  }

  return quickSort;
}
