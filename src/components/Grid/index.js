// defining the grid based on firebase database
// get a list of containers with the type of children
import React, { useState, useEffect } from "react";
import Container from "../Container";
import { AddButton } from "../MUI/Button";

import uuid from "react-uuid";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  containerIDsState,
  editableState,
  freeSpace,
  gridSpecs,
  layout,
  getContainerState,
} from "../../recoil/atoms";

import { useNextFreeSpace } from "../../hooks/FreeSpace";
import { useAddContainer } from "../../hooks/useAddContainer";

import { useLocalStorage } from "../../user/localStorage/useLocalStorage";

// react dnd for drag-drop behavior in todo boards and bookmarks
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function Grid() {
  // disable events when dragging
  const [dragging, setDragging] = useState(false);
  const [containerIDs, setContainerIDs] = useRecoilState(containerIDsState);

  const editable = useRecoilValue(editableState);
  const grid = useRecoilValue(gridSpecs);

  const [listOfFreeSpace, setListOfFreeSpace] = useRecoilState(freeSpace);
  // to set the default positoin of any new container
  const getNextFreeSpace = useNextFreeSpace();
  const getAddContainer = useAddContainer();

  const [nextPos, setNextPos] = useState([]);

  const [_, setStorageContainerIDs] = useLocalStorage("containerIDs", null);

  // initialize the free space list (for checking free space)
  useEffect(() => {
    // initialize the list of free space here
    // an object with row number as key and values are arrays
    let tempObj = {};
    for (let i = 0; i < grid.r; i++) {
      tempObj = {
        ...tempObj,
        [i]: Array(grid.c).fill(true),
      };
    }
    setListOfFreeSpace({ ...tempObj });
  }, []);

  // set the containersIDs if there is value in localStorage
  // else, don't execute this useEffect
  // TODO: disabled for now. local storage not finished.
  //   useEffect(() => {
  //     const idsInStorage = JSON.parse(localStorage.getItem("containerIDs"));
  //     if (idsInStorage !== null) {
  //       const ids = Object.values(idsInStorage);
  //       setContainerIDs(ids);
  //     }
  //   }, []);

  // this would add any new container ids
  // and delete any container id if the user deleted it
  useEffect(() => {
    setStorageContainerIDs({ ...containerIDs });
  }, [containerIDs]);

  // adding containers with default posiiton based on the next free space
  // by using the useNextFreeSpace() hook
  // this function is called whenever the button is clicked
  const addContainer = (option) => {
    setNextPos(getNextFreeSpace());
    const newID = uuid();
    getAddContainer(option, newID);
    setContainerIDs([...containerIDs, newID]);
  };

  // debugging
  //   useEffect(() => {
  //     console.log("*********list of free space changed*********");
  //     console.log({ listOfFreeSpace });
  //   }, [listOfFreeSpace]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full">
        {/* passing setDragging to be used for disabling other buttons when dragging */}
        {containerIDs.map((id) => (
          <Container
            key={id}
            id={id}
            // this should be usable in here because the add button needs to be disabled
            setDragging={setDragging}
            dragging={dragging}
            // default position got from useFreeSpace hook
            defaultPosition={nextPos}
          />
        ))}

        {/* mui floating action button; disabled when dragging */}

        {editable && (
          <div
            className={`absolute bottom-3 right-3 ${
              dragging || getNextFreeSpace() === null
                ? "opacity-20 pointer-events-none"
                : ""
            }`}
          >
            <AddButton
              addContainer={addContainer}
              add={!(dragging || getNextFreeSpace() === null)}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Grid;
