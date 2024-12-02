import { atom } from 'recoil';
import mem from 'mem';

// an array of IDs for an array of draggable containers 
export const containerIDsState = atom({
    key: 'containerID', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (initial value)
});

// return the same container if the given id is the same (mem)
export const getContainerState = mem((id) =>
    atom({
        key: `containerState${id}`,
        default: {
            x: 0, y: 0, //position (in relation to grid unit; 2 means 2 x minH/minW)
            defaultX: 0, defaultY: 0,  //default position 

            w: 0, h: 0, //size (in relation to grid unit; 2 means 2 x minH/minW)
            defaultW: 0, defaultH: 0, // default size 

            type: 'Empty', // type of the child inside the container 
        },
    })
);


// for controlling edit mode; 
// several componenets will be disabled 
export const editableState = atom({
    key: 'editableState',
    default: true,
});

// specs for the grid 
export const gridSpecs = atom({
    key: 'gridSpecs',
    default: {
        // row and columns of the grid 
        r: 2, c: 6,
        // one grid rectangle unit
        // minW = width / c
        // minH = height / r 
        minW: 0, minH: 0,
        // margin that affects the position and resizing behavior of the containers 
        margin: 20,
        // width and height of the main area to set limits on the 
        // position and size of the containers 
        windowWidth: 0, windowHeight: 0,
    },
});

// drag to size and position 
export const dragToSpecs = atom({
    key: 'dragToSpecs',
    default: {
        x: '0px', y: '0px',
        w: '0px', h: '0px'
    }
});


// changing the color theme of the components 
export const colorModeToggle = atom({
    key: 'colorModeToggle',
    default: 'dark'
});

// setting the information of user using firebase auth() (./firebase/signIn)
export const userState = atom({
    key: 'userState',
    default: {
        userId: '',
        isSignedIn: false,
        name: '',
        provider: '',
        email: '',
        avatar: '',
        error: '',
    }
});


// free space that stores whether at a location is free(1) or not(0)
// row number is y, column number is x
// first row then column 
// {row number (y) : [index as column numbers]} 
// remember that for ex., (0, 1) means that there is a container(width 1 height 1) 
// from (0, 1) to (1, 2)
export const freeSpace = atom({
    key: 'freeSpace',
    default: {}
}); 


// { rowNumber: {colNumber: "type of the container"} } 
export const layout = atom({
    key: 'layoutOfContainers', 
    default: {}
}); 