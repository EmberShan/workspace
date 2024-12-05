// return the next free space
import { useRecoilValue } from "recoil";
import { freeSpace } from "../../recoil/atoms";

// custom hook that returns the getFreeSpace function
// TWO containers: one is the old container before the change
// and the other one is the new/current container after the change
// the change could be resizing and dragging and adding
// all changes except deleting
export function useNextFreeSpace() {
  // gettting the free space list atom
  const listOfFreeSpace = useRecoilValue(freeSpace);

  function getNextFreeSpace() {
    let arr = null;

    try {
      Object.keys(listOfFreeSpace).some(function (rowNumber, index) {
        const colNumber = listOfFreeSpace[rowNumber].indexOf(true);
        if (colNumber !== -1) {
          arr = [parseInt(colNumber), parseInt(rowNumber)];
          return arr;
        }
      });
    } catch {}

    // if no free space, then return null
    return arr;
  }

  return getNextFreeSpace;
}
