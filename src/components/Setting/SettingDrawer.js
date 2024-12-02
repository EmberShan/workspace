import React from 'react'
// mui 
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// content of the setting panel 
import SettingAccordion from './SettingAccordion';


export default function SettingDrawer({ isOpen, setIsOpen }) {
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            variant="temporary"
            elevation={3}
        >

            <div
                className='
                setting w-[700px] h-full relative 
                flex flex-col items-center justify-center
                overflow-hidden
            '>
                <IconButton aria-label="close the setting panel"
                    onClick={() => setIsOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon className="icon w-full" />
                </IconButton>

                <SettingAccordion />
            </div>

        </Drawer>
    )
}
