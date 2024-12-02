import { selector } from 'recoil';
import { 
    containerIDsState, 
    getContainerState, 
    gridSpecs, 
    freeSpace 
} from './atoms'

export const initializeFreeSpaceList = selector({
    key: 'initializeFreeSpaceList', 
    get: ({get}) => {
        const grid = get(freeSpace); 
        let tempArray = {}
        for (let i = 0; i < grid.r; i++) {
            tempArray = {
                ...tempArray,
                [i]: Array(grid.c).fill(true),
            }
        };
        return tempArray;
    }
}); 