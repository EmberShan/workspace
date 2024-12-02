import React from 'react'
import { useRecoilValue } from 'recoil';
import { editableState, gridSpecs } from '../../recoil/atoms';
// the grid that defines the underlying layout 
// parent: relative (avoid obstructing the menu in edit mode)
// children/containers: absolute
// props: margin, border (visibility of the border)
// 6 cols x 3 rows 
function Ruler() {
    const editable = useRecoilValue(editableState);
    const grid = useRecoilValue(gridSpecs); 

    return (
        // the ruler consists of one giant container with grid auto flow (rows)
        // first Map: it maps several row-wise containers (also grid; auto flow col)
        // Second Map: then in each of these containers, we render the column-wise containers 
        <>
        {
            editable && 
            <div className={`absolute w-full h-full opacity-50 flex flex-col z-[-1] box-border justify-between`}>
                {[...Array(grid.r)].map((row, r) =>
                    <div key={r} className={`flex flex-row justify-between`}>
                        {[...Array(grid.c)].map((col, c) =>
                            <div key={r + c} className={`border-[.5px]`}
                                style={{
                                    width: grid.minW, 
                                    height: grid.minH
                                }}
                            />
                        )}
                    </div>
                )}

            </div>
        }
        </>
    )
}

export default Ruler