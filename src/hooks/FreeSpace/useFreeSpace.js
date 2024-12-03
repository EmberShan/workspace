// check if the container is within the free space when resizing and dragging 
import { useRecoilValue } from 'recoil';
import { freeSpace } from '../../recoil/atoms'

export function useFreeSpace() {
    const listOfFreeSpace = useRecoilValue(freeSpace);

    // get the value of x, y, w, h that need to be checked 
    // check if the dragged to or resized position is within limit
    const checkFreeSpaceWithinLimit = (container, changedTo) => {
        console.log("checking free space--------")
        // 
        const minX = changedTo.x;
        const maxX = changedTo.x + changedTo.w;
        const minY = changedTo.y;
        const maxY = changedTo.y + changedTo.h;
        const w = changedTo.w;
        const h = changedTo.h;

        // to not considering that the old container occupied the space   
        const oldX = container.x;
        const oldY = container.y;
        const oldMaxX = container.x + container.w;
        const oldMaxY = container.y + container.h;

        try {
            for (let y = minY; y < maxY; y++) {
                for (let x = minX; x < maxX; x++) {
                    // if resizing, and it is checking the container before the change
                    // the furtherest point of the container before resizing 
                    const isOldContainer = (
                        ((y >= oldY && y < oldMaxY) && (x >= oldX && x < oldMaxX))
                        // ||
                        // (((y + h) >= oldY && (y + h) < oldMaxY) && ((x + w) >= oldX && (x + w) < oldMaxX))
                    );
    
                    console.log(isOldContainer); 
    
                    if (!isOldContainer) {
                        console.log(false); 
                        if (!listOfFreeSpace[y][x]) return false;
                    }
    
                }   
            }
        } catch {
            console.log('useFreeSpace error'); 
        }

        return true; 

    }
    return checkFreeSpaceWithinLimit

}