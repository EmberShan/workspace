// storing the color themes to be used by globalstyles 
// { "themeName" : { "id", "name", "colors" : {} } } 
export const themes = {
    light: {
        "id": "theme-light",
        "name": "light",
        "colors": {
            "bg": "#F8F8F8",
            "bg2": "#FFFFFF", 
            "primary": "#000000",
            "border": "#bdbdbd", 
            "button": {
                "text": "",
                "bg": ""
            },
            "hover": "#1985a1", 
            "hover_text": "#FFFFFF", 
            "important": "#1985a1", 
            "active": "rgba(0, 0, 0, .2)", 
        }
    },
    dark: {
        "id": "theme-dark",
        "name": "dark",
        "colors": {
            "bg": "#03080E",
            "bg2": "#141D26", 
            "bg3": "#43485B", 

            "primary": "#FFFFFF",

            "border": "rgba(129, 133, 168, .5)", 

            "button": {
                "text": "#FFFFFF",
                "bg": "#2F3559", 
            },

            "hover": "rgba(129, 133, 168, .1)", 
            "hover_text": "#FFFFFF", 

            "important": "#FFFFFF", 
            "active": "rgba(129, 133, 168, .3)", 
        }
        
    }

}