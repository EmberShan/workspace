import React, { useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import { signInPopUpOpened, signOutPopUpAlert } from '../../recoil/settingAtoms'

import HowToUse from './AccodionContent/HowToUse'
import Contact from './AccodionContent/Contact';

// animation for accordion collapsing and expanding 
import { motion, AnimatePresence } from "framer-motion"


function SettingAccordion() {
    // to see if the user is signed in, if yes, then display sign out 
    const userInfo = useRecoilValue(userState);

    // setting atom that stores whether to open or close the sign out alert 
    const [_, setSignOutAlert] = useRecoilState(signOutPopUpAlert);
    // atom for storing whether to show the login panel or not 
    const [__, setSignInOpened] = useRecoilState(signInPopUpOpened);

    // for expanding or collapsing the accordion 
    const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // close other accordion when open one 
    const toggleHowToUse = () => {
        setIsHowToUseOpen(!isHowToUseOpen);
        setIsContactOpen(false)
    };
    const toggleContact = () => {
        setIsContactOpen(!isContactOpen);
        setIsHowToUseOpen(false)
    };

    return (
        <>
            <button className='btn settingBtn'> Profile </button>

            {/* simple tutorial for showing a guide of how to use this app */}
            <button className='btn settingBtn'
                onClick={toggleHowToUse}> Settings </button>
            <AnimatePresence initial={false}>
                {isHowToUseOpen &&
                    <motion.div
                        key='contactme'
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "100%" },
                            collapsed: { opacity: 0, height: "0" }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        {/* <HowToUse /> */}
                    </motion.div>
                }

            </AnimatePresence>


            {/* contact page with simple form and email etc */}
            <button className='btn settingBtn'
                onClick={toggleContact}> Contact Me </button>

            <AnimatePresence initial={false}>
                {isContactOpen &&
                    <motion.div
                        key='contactme'
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "100%" },
                            collapsed: { opacity: 0, height: "0" }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <Contact />
                    </motion.div>
                }
            </AnimatePresence>

            {/* display sign in when signed in; else, display sign out */}
            {userInfo.isSignedIn ?
                <button className='btn settingBtn border-none'
                    onClick={() => {
                        setSignOutAlert(true);
                    }}>
                    Sign out </button> :
                <button className='btn settingBtn border-none'
                    onClick={() => {
                        setSignInOpened(true);
                        // getSignInData();
                    }}> Sign in </button>
            }
        </>
    )
}

export default SettingAccordion
