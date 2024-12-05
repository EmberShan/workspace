import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { freeSpace } from "../../recoil/atoms";

// custom hook that returns the getFreeSpace function
// TWO containers: one is the old container before the change
// and the other one is the new/current container after the change
// the change could be resizing and dragging and adding
// all changes except deleting
export function useUpdateFreeSpace() {
  // gettting the free space list atom
  const [listOfFreeSpace, setListOfFreeSpace] = useRecoilState(freeSpace);

  function getFreeSpace(oldContainer, newContainer, isRemoving) {
    // console.log("old container:", oldContainer);
    // console.log("new container:", newContainer);
    // to find out what spaces are changed, we need to find all the coordinates
    // that could be changed (smallest point before the change, and after)

    // old container that should be looped and set to true (free space)
    const oldX = oldContainer.x;
    const oldY = oldContainer.y;
    const oldMaxX = oldContainer.x + oldContainer.w;
    const oldMaxY = oldContainer.y + oldContainer.h;

    // looping through the old one
    try {
      for (let y = oldY; y < oldMaxY; y++) {
        for (let x = oldX; x < oldMaxX; x++) {
          setListOfFreeSpace((prevListOfFreeSpace) => ({
            ...prevListOfFreeSpace,
            [y]: [
              ...prevListOfFreeSpace[y].slice(0, x),
              true,
              ...prevListOfFreeSpace[y].slice(x + 1),
            ],
          }));
        }
      }
    } catch {}

    // new container that should be looped and set to false (not free)
    const newX = newContainer.x;
    const newY = newContainer.y;
    const newMaxX = newContainer.x + newContainer.w;
    const newMaxY = newContainer.y + newContainer.h;

    // looping through the old one
    try {
      for (let y = newY; y < newMaxY; y++) {
        for (let x = newX; x < newMaxX; x++) {
          // if it is removing then it should be set to true (free)
          // if not (resizing, dragging, or adding) then set to false (not free)
          setListOfFreeSpace((prevListOfFreeSpace) => ({
            ...prevListOfFreeSpace,
            [y]: [
              ...prevListOfFreeSpace[y].slice(0, x),
              isRemoving ? true : false,
              ...prevListOfFreeSpace[y].slice(x + 1),
            ],
          }));
        }
      }
    } catch {
        console.log('useUpdateFreeSpace'); 
    }

    return listOfFreeSpace;
  }

  return getFreeSpace;
}
