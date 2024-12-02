import React, { useState, useEffect, useRef } from 'react'
import Grid from '../Grid'
import Ruler from '../Grid/Ruler'

import { useRecoilState } from 'recoil';
import { gridSpecs } from '../../recoil/atoms'


function Main({ }) {
  // control row and col through the menu
  const windowRef = useRef(null);
  const [grid, setGrid] = useRecoilState(gridSpecs);

  // set the grid specs on first load (window width, height, 
  // calculate the grid unit based on rows and cols)
  useEffect(() => {
    setGrid({
      ...grid,
      // setting the width and height of the main area  
      windowWidth: windowRef.current.clientWidth,
      windowHeight: windowRef.current.clientHeight,
      // one grid unit 
      // minW: windowRef.current.clientWidth / grid.c,
      // minH: windowRef.current.clientHeight / grid.r,
      minW: (windowRef.current.clientWidth - (grid.c - 1) * grid.margin) / grid.c,
      minH: (windowRef.current.clientHeight - (grid.r - 1) * grid.margin) / grid.r,
    });
    
  }, []);
  
  // when window is resized, set the grid values again 
  useEffect(() => {
    const resizeHanlder = () => {
      setGrid({
        ...grid,
        windowWidth: windowRef.current.clientWidth,
        windowHeight: windowRef.current.clientHeight,
        // one grid unit without the margin
        minW: (windowRef.current.clientWidth - (grid.c - 1) * grid.margin) / grid.c,
        minH: (windowRef.current.clientHeight - (grid.r - 1) * grid.margin) / grid.r,
      });
    }
    // window resize listeners 
    window.addEventListener('resize', resizeHanlder);

    return () => {
      window.removeEventListener('resize', resizeHanlder);
    };
  }, []);


  return (
    <div ref={windowRef}
      className='w-[95%] h-[95%] mx-auto relative flex items-center justify-center'>

      <Grid />
      <Ruler />

    </div>
  )
}

export default Main