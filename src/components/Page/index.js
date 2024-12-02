import React, { useEffect } from 'react'
import Main from '../Main'
import Menu from '../Menu'

import { GlobalStyles } from '../../theme/GlobalStyles';
import { themes } from '../../theme/themes'

import { useRecoilValue } from 'recoil';
import { colorModeToggle } from '../../recoil/atoms'


function Page() {
    const colorMode = useRecoilValue(colorModeToggle);

    return (
        <>
            <GlobalStyles theme={ themes[colorMode] } />
            <div className="App w-screen h-screen overflow-hidden 
                grid grid-rows-[5%_95%] grid-cols-[100%] 
                items-center justify-center my-auto">
                <Menu />
                <Main />
            </div>
        </>
    )
}

export default Page
