// signing in with multiple providers 
import React from 'react'
// firebase 
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { userAuth } from "../../user/firebase";
import { logIn } from "../../user/auth";
// mui dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// other mui icons 
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

// import the recoil atom states
import { useRecoilState } from 'recoil';
import { signInPopUpOpened } from '../../recoil/settingAtoms';


export function SignInOptionsPopup() {
    const [signInOpened, setSignInOpened] = useRecoilState(signInPopUpOpened);

    const handleClose = () => {
        console.log(signInOpened)
        setSignInOpened(false);
    };

    return (
        <div className='dialog'>
            <Dialog
                open={signInOpened}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* close icon here */}
                <DialogTitle id="alert-dialog-title">
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span> Sign in work space </span>
                        <span className='flex flex-col items-center justify-center
                                space-y-3 h-full w-full p-8'>

                            {/* google sign in button */}
                            <Button
                                startIcon={<GoogleIcon />}
                                variant="contained"
                                onClick={() => {
                                    const googleProvider = new GoogleAuthProvider();
                                    logIn(googleProvider);
                                    handleClose();
                                }}
                                style={{
                                    backgroundColor: '#DB4437',
                                }}
                            >
                                Sign in with Google
                            </Button>
                            {/* github sign in button */}
                            <Button
                                startIcon={<GitHubIcon />}
                                variant="contained"
                                onClick={() => {
                                    const githubAuthProvider = new GithubAuthProvider();
                                    logIn(githubAuthProvider);
                                    handleClose();
                                }}
                                style={{
                                    backgroundColor: 'black',
                                }}
                            >
                                Sign in with Github
                            </Button>

                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>

        </div>
    )
}
