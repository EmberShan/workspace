import { createGlobalStyle} from "styled-components";
// import { themes } from "./themes";

export const GlobalStyles = createGlobalStyle`
    body{
        background: ${ ({theme}) => theme.colors.bg }; 
    }
    .setting, .setting .accordian, textarea{
        background: ${ ({theme}) => theme.colors.bg2 }; 
        color: ${ ({theme}) => theme.colors.primary };
    }
    html, .icon{
        color: ${ ({theme}) => theme.colors.primary }; 
    }
    .important{
        color: ${ ({theme}) => theme.colors.important }; 
    }
    .btn, .accordionContent{
        border-color: ${ ({theme}) => theme.colors.border }; 
    }
    .btn:hover, .icon:hover{
        background-color: ${ ({theme}) => theme.colors.hover } !important; 
        transition: all .2s ease-out;  
    }
    .container{
        background-color: ${ ({theme}) => theme.colors.bg2 }; 
        color: ${ ({theme}) => theme.colors.primary }; 
    }
    .active{
        background-color: ${ ({theme}) => theme.colors.active } !important; 
        font-weight: bold; 
    }
`