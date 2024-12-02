import React, {useRef, useEffect} from 'react'; 
// passing in a state and storing the old state data
function usePrevious(state) {
    const ref = useRef();

    useEffect(() => {
        ref.current = state; //assign the value of ref to the argument
    }, [state]); //this code will run when the value of 'value' changes
    
    return ref.current; //in the end, return the current ref value.
}
export default usePrevious;