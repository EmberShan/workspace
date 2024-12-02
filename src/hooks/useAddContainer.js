import { useRecoilCallback } from 'recoil';
import { getContainerState } from '../recoil/atoms';

export const useAddContainer = () => {

    return useRecoilCallback(({ set }) => (option, newID) => {

        // Update the state of the new container
        const containerState = getContainerState(newID);
        set(containerState, (prevState) => ({
            ...prevState, 
            type: option, // Update only the `type`
        })); 

        console.log(option); 
    });
};
