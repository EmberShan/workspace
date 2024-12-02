import React, { useEffect, useState } from 'react';
import { userAuth } from '../../user/firebase';
import { logOut } from '../../user/auth';

import { AlertDialog, SignInOptionsPopup } from '../Dialog';

import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';

import { signOutPopUpAlert } from '../../recoil/settingAtoms'

import SettingDrawer from './SettingDrawer';

// setting for controlbuttonng profile etc. 
// sign in and sign out here; the only place to sign out 
function Setting({ isOpen, setIsOpen }) {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // true for sign out, false for stay signed in 
  const [dialogChoice, setDialogChoice] = useState(true);
  // setting atom that stores whether to open or close the sign out alert 
  const [signOutAlert, setSignOutAlert] = useRecoilState(signOutPopUpAlert);

  // log user out if they clicked yes for the alert dialog 
  useEffect(() => {
    if (!dialogChoice) {
      logOut();
    };
  }, [dialogChoice]);

  // the firebase onAuthStateChanged for listening to changes
  // updating the user state (atom) when the user signs in or out   
  useEffect(() => {
    return userAuth.onAuthStateChanged((user) => {
      if (user) {
        // when signing in 
        setUserInfo({
          ...userInfo,
          userId: user.uid,
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          error: '',
        });
      } else {
        // when signing out 
        setUserInfo({
          userId: '',
          isSignedIn: false,
          name: '',
          provider: '',
          email: '',
          avatar: '',
          error: '',
        });
      }
    });
  }, []);

  return (
    <>

      {/* popup for signing in */}
      <SignInOptionsPopup />

      {/* popup for alerting if really wants to log out */}
      <AlertDialog
        alert={{
          message: "Are you sure you want to log out?",
          leftOption: 'Yes, Sign me out',
          rightOption: 'Stay Signed in',
        }}
        isOpen={signOutAlert}
        setIsOpen={setSignOutAlert}
        setAnswer={setDialogChoice}
      />

      {/* the acutal setting drawer panel */}
      <SettingDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen} 
      />

    </>
  )
}

export default Setting