import { atom } from 'recoil';

// for controlling the sign in popup window 
export const signInPopUpOpened = atom({
    key: 'signInPopUpOpened', 
    default: false, 
});

// for controlling the sign out alert window 
export const signOutPopUpAlert = atom({
    key: 'signOutPopUpAlert', 
    default: false, 
});