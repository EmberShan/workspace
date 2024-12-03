// for draggable containers
import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";

import DragTo from "./DragTo";
import Child from "../Children";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  getContainerState,
  editableState,
  gridSpecs,
  containerIDsState,
  freeSpace,
} from "../../recoil/atoms";

import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";

import { useUpdateFreeSpace, useFreeSpace } from "../../hooks/FreeSpace";

import usePrevious from "../../hooks/usePrevious";
import { useLocalStorage } from "../../user/localStorage/useLocalStorage";

const Container = ({ setDragging, id, defaultPosition }) => {
  // storing and setting anything related to one container (mem atom)
  // width, height, position, type, etc.
  const [container, setContainer] = useRecoilState(getContainerState(id));
  // toggling the edit mode
  const editable = useRecoilValue(editableState);
  // grid values (minW, minH are the two most important ones)
  const grid = useRecoilValue(gridSpecs);
  // specific to one container; different from dragging which is same for all
  // containers in the same grid
  const [clicked, setClicked] = useState(false);
  // ref to calculating the current width and height of the container
  const containerRef = useRef(null);
  // this is both the dependency state and the state that determines the
  // position of the dragto (which in turn set the position of the current container)
  const [changing, setChanging] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });
  // for deleting containers: finding the index of the current container
  // in the containerIds array and then delete it from the id list
  const [containerIDs, setContainerIDs] = useRecoilState(containerIDsState);
  const index = containerIDs.findIndex((item) => item === id);

  // for updating the free space list when adding or deleting containers
  // and resizing and dragging the containers
  const oldContainer = usePrevious(container);
  // the hooks for free space
  const updateFreeSpace = useUpdateFreeSpace();
  const checkFreeSpace = useFreeSpace();

  const [isInit, setIsInit] = useState(false);

  const [storageContainers, setStorageContainers] = useLocalStorage(
    "containerStates",
    null
  );

  const checkIfIdInStorage = () => {
    const state = JSON.parse(localStorage.getItem("containerStates"));
    if (state) {
      if (id in state) {
        return state[id];
      }
    }
    return null;
  };

  // set the container size and position on start
  // TODO: place the container in the free space
  // and update the free space list atom
  useEffect(() => {
    if (!isInit) {
      if (checkIfIdInStorage() !== null) {
        setContainer({
          ...checkIfIdInStorage(),
        });
        setChanging({
          ...checkIfIdInStorage(),
        });
      } else {
        // col number
        const posX = defaultPosition[0];
        // row number
        const posY = defaultPosition[1];

        setContainer({
          ...container,
          x: posX,
          y: posY,
          w: 1,
          h: 1,
        });
        setChanging({
          ...container,
          x: posX,
          y: posY,
          w: 1,
          h: 1,
        });
      }
    }
    // setting this to true, so we can know container is set
    // so that we could update the free space list
    setIsInit(true);
  }, []);

  // updated whenever container state changes
  // updating free space when deleting is performed
  // in the useDeleteContainer function
  // updating the free space list when resizing and dragging
  useEffect(() => {
    if (isInit) {
      // update the free space list
      updateFreeSpace(oldContainer, container);
      // set the container states in local storage from the container
      setStorageContainers({
        ...storageContainers,
        [id]: {
          x: container.x,
          y: container.y,
          w: container.w,
          h: container.h,
          type: container.type,
        },
      });
    }
  }, [container]);

  // hook to delete the container
  const useDeleteContainer = () => {
    console.log("deleted!");
    // pass in false because we are deleting the container
    updateFreeSpace(oldContainer, container, true);

    // delete the corresponding container state through id from the localStorage
    const states = JSON.parse(localStorage.getItem("containerStates"));
    delete states[id];
    localStorage.setItem("containerStates", JSON.stringify(states));

    // updating the free space list when this container is deleted
    const newContainerList = [
      ...containerIDs.slice(0, index),
      ...containerIDs.slice(index + 1),
    ];
    setContainerIDs(newContainerList);
    // useResetRecoilState(getContainerState(id));
  };

  // functions for handling dragging and resizing
  // when dragging, set the changing states to be the final position to be snapped to,
  // then because this changes, it will cause DragTo to be rendered
  const onDragHandler = (e, data) => {
    // setting the position x and y to be within the limit of the window
    // remember, this is the relative units
    // actual positions are posX times grid unit (grid.minW)
    // here it is relative because if flooring the relative unit does not change,
    // we should not update the dragto
    // this behavior can only be achieved by using the relative units that calculates
    // the position in terms of the number of rectangles/units
    // const maxPosX = (grid.windowWidth - grid.minW) / grid.minW + container.x * grid.margin;
    // const maxPosY = (grid.windowHeight - grid.minH) / grid.minH + container.y * grid.margin;
    let posX = Math.floor(data.x / grid.minW + 1 / 3);
    let posY = Math.floor(data.y / grid.minW + 1 / 4);
    posX = posX > grid.c - 1 ? grid.c - 1 : posX;
    posY = posY > grid.r - 1 ? grid.r - 1 : posY;

    let sizeW = Math.floor(containerRef.current.offsetWidth / grid.minW);
    let sizeH = Math.floor(containerRef.current.offsetHeight / grid.minH);

    sizeW = Math.min(Math.max(sizeW, 1), grid.c);
    sizeH = Math.min(Math.max(sizeH, 1), grid.r);

    if (posX !== changing.x || posY !== changing.y) {
      console.log({ posX, posY, sizeW, sizeH });
      const isFree = checkFreeSpace(container, {
        x: posX,
        y: posY,
        w: sizeW,
        h: sizeH,
      });
      if (isFree) {
        console.log("set changing called");
        setChanging({
          x: posX,
          y: posY,
          w: sizeW,
          h: sizeH,
        });
      }
    }

    setDragging(true);
    setClicked(true);
  };
  const onResizeHandler = (e, direction, ref, delta, position) => {
    let posX = Math.floor(position.x / grid.minW);
    let posY = Math.floor(position.y / grid.minW);
    posX = posX > grid.c - 1 ? grid.c - 1 : posX;
    posY = posY > grid.r - 1 ? grid.r - 1 : posY;

    let sizeW = Math.floor(ref.offsetWidth / grid.minW + 1 / 2);
    let sizeH = Math.floor(ref.offsetHeight / grid.minH + 1 / 2);
    sizeW = Math.min(Math.max(sizeW, 1), grid.c);
    sizeH = Math.min(Math.max(sizeH, 1), grid.r);

    if (sizeW !== changing.w || sizeH !== changing.h) {
      console.log({ posX, posY, sizeW, sizeH });
      const isFree = checkFreeSpace(container, {
        x: posX,
        y: posY,
        w: sizeW,
        h: sizeH,
      });
      if (isFree) {
        setChanging({
          x: posX,
          y: posY,
          w:
            direction === "right" || direction === "bottomRight"
              ? sizeW
              : container.w,
          h:
            direction === "bottom" || direction === "bottomRight"
              ? sizeH
              : container.h,
        });
      }
    }

    setDragging(true);
    setClicked(true);
  };

  // when resizing or dragging stop, then set the position and sizes of the container
  const onStopHandler = () => {
    setDragging(false);
    setClicked(false);

    setContainer({
      ...container,
      x: changing.x,
      y: changing.y,
      w: changing.w,
      h: changing.h,
    });
  };

  return (
    <>
      <Rnd
        // need to multiply the relative positions and sizes with the grid unit (minW, and minH)
        position={{
          x: container.x * grid.minW + container.x * grid.margin,
          y: container.y * grid.minH + container.y * grid.margin,
        }}
        size={{
          width: container.w * grid.minW + (container.w - 1) * grid.margin,
          height: container.h * grid.minH + (container.h - 1) * grid.margin,
        }}
        default={{
          x: defaultPosition[0],
          y: defaultPosition[1],
        }}
        bounds="parent"
        disableDragging={!editable}
        enableResizing={
          editable && {
            top: false,
            right: true,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: false,
            topLeft: false,
          }
        }
        onDrag={onDragHandler}
        onDragStop={onStopHandler}
        onResize={onResizeHandler}
        onResizeStop={onStopHandler}
        // bounds of sizes
        // not smaller than one unit and no larger than the window
        minWidth={grid.minW + "px"}
        minHeight={grid.minH + "px"}
        maxWidth={grid.windowWidth}
        maxHeight={grid.windowHeight}
        cancel={"span"}
        className="container"
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        {editable && (
          <span className={`absolute top-[5px] right-[5px] space-x-2`}>

            <IconButton aria-label="delete" onClick={useDeleteContainer}>
              <DeleteIcon
                className="important"
                style={{
                  fontSize: "1rem",
                }}
              />
            </IconButton>
          </span>
        )}

        <div
          ref={containerRef}
          className={` 
                    ${editable && "hover:cursor-grab"} 
                    w-full z-1 h-full 
                    p-[1.5rem] pt-[2rem] overflow-scroll scrollbar-hide`}
        >
          {/* child here */}
          <Child type={container.type} />
        </div>

        {editable && (
          <span
            className={`resize-handler absolute bottom-1 right-1 space-x-2 opacity-40`}
          >
            <CallReceivedOutlinedIcon className="rotate-[270deg]" />
          </span>
        )}
      </Rnd>

      {clicked && <DragTo changing={changing} />}
    </>
  );
};

// memorize the container, so if nothing changes, don't re-render the box
export default React.memo(Container);
