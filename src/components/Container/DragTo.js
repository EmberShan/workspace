// indicating where the container will be dragged to? 
import React from 'react'
import { useRecoilValue } from 'recoil';
import { gridSpecs } from '../../recoil/atoms';

// receives the state changing from parent container and render it accordingly 
function DragTo({ changing }) {
    // size and position of this component  
    const grid = useRecoilValue(gridSpecs); 
    // console.log({changing})

    return (
        <div className={`bg-red-200 absolute z-[-1] opacity-50`}
            // the margin should increase based on which row or column the container is at 
            // if it is on the third column, then we need to multiply the margin 
            // with its relative position which is the changing.x/y
            style={{
                left: `${changing.x * grid.minW + changing.x * grid.margin}px`,
                top: `${changing.y * grid.minH + changing.y * grid.margin}px`,
                width: `${changing.w * grid.minW + (changing.w-1) * grid.margin}px`,
                height: `${changing.h * grid.minH + (changing.h-1) * grid.margin}px`,
            }}>
        </div>
    )
}

export default React.memo(DragTo); 
