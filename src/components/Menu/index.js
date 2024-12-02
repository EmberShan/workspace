import React, { useState, useEffect } from 'react';

import { DarkModeSwitch } from '../MUI/Button';
import Setting from '../Setting';
import { userAuth } from '../../user/firebase';
import { SignInOptionsPopup } from '../Dialog';

import { useRecoilState } from 'recoil';
import { editableState, colorModeToggle, userState } from '../../recoil/atoms';
import { signInPopUpOpened } from '../../recoil/settingAtoms'

// mui material icons 
import UndoIcon from '@mui/icons-material/Undo';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
// mui componenets 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


// this is for displaying "edit" and "setting" at the top of the page
// edit mode: 
// for changing sizes and positions of the parent containers 
// clicking on a container, there will be a popup menu for changing the content of the container
// dark/light mode
// customization of colors? 

// setting: 
// popup menu with settings, and sign in sign out, contact, 

// TODO: define rows and cols and calculate the gridunit(minW, minH) here 
function Menu() {
  const [editable, setEditable] = useRecoilState(editableState);
  const [settingOpen, setSettingOpen] = useState(false);
  const [darkMode, setDarkMode] = useRecoilState(colorModeToggle);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  // multiple sign in choices, need to be used for both menu and setting 
  const [_, setSignInOpened] = useRecoilState(signInPopUpOpened);

  // toggling the dark and light mode 
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      return prevMode !== 'light' ? 'light' : 'dark';
    });
  };

  // firebase onAuthStateChanged for listening to changes in sign in/out 
  useEffect(() => {
    return userAuth.onAuthStateChanged((user) => {
      if (user) {
        // when signing in set the userState atom 
        setUserInfo({
          ...userInfo,
          userId: user.uid,
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          error: '',
        });
      }
    });
  }, []);

  return (
    <div className="w-full h-full space-x-5 flex items-center pt-3 z-10">
      {/* sign in popup dialog */}
      <SignInOptionsPopup />

      {/* top left menu with sign in button, undo icon, ... */}
      <div className='flex items-center space-x-6 ml-10 mt-2 pl-8 z-1 absolute right-10'>
        {/* pencil icon for controlling edit mode */}
        <div className={`menu-icon ${editable && "bg-slate-500 text-white"}`}
          onClick={() => setEditable(!editable)}>
          <EditIcon />
        </div>

        {/* setting icon that controls whether to open the setting popup */}
        <div className='menu-icon'
          onClick={() => setSettingOpen(!settingOpen)}>
          <SettingsIcon />
        </div>

        <div>
          {/* user avatar; display if the user has signed in; else, display the user avatar */}
          {userInfo.isSignedIn ?
            <Avatar alt="user avatar img" src={userInfo.avatar} />
            :
            <Button className="btn" variant="contained"
              onClick={() => {
                setSignInOpened(true);
              }}> Sign in </Button>
          }
        </div>
      </div>

      {/* setting panel */}
      <Setting
        isOpen={settingOpen}
        setIsOpen={setSettingOpen}
      />

      {/* main part of the top bar menu */}
      <div className='flex items-center absolute left-10 space-x-4'>
        {editable &&
          <div className='menu-icon'>
            <UndoIcon />
          </div>
        }
        <DarkModeSwitch checked={darkMode === "dark"} className='mr-10' onClick={toggleDarkMode} />


      </div>

    </div>
  )
}

export default Menu
