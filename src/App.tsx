import React from 'react';
import AppLayout from './AppLayout'
import { ConfigProvider, theme } from 'antd';
import { generate } from '@ant-design/colors';
import type { ThemeConfig, } from 'antd';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './components-styled/GlobalStyles';


const { darkAlgorithm, defaultAlgorithm } = theme;
const initialColorPrimary = '#001529'
const initialColorAccent = '#1CEC65'

const getInitialAccentColor = () => {
    return localStorage.getItem('accentColor') ?? initialColorAccent
}
const getInitialDarkMode = () => {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === null) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return darkMode === 'true'
}

// Append the transparancy code to them since generate does not return transparency.
function generateWithTransparency(color: string, backgroundColor: string, transparencyHexCode: string, darkMode: boolean) {
    const generated = generate(color, {
        theme: darkMode ? 'dark' : 'default',
        backgroundColor: backgroundColor //darkMode ? '#000000' : '#ffffff'
    })
    // Grab the transparency code from the end of accentColor and append it to our generated colors.
    for (let i = 0; i < generated.length; i++) {
        generated[i] = generated[i] + transparencyHexCode
    }
    return generated
}

function App() {
    // const [themeConfig, setThemeConfig] = React.useState(globalThemeConfig)
    const [darkMode, setDarkMode] = React.useState(getInitialDarkMode())
    const [accentColor, setAccentColor] = React.useState<string>(getInitialAccentColor())

    const transparencyHexCode = accentColor.slice(7)
    const containerBgColor = darkMode ? '#111111' + transparencyHexCode : '#FFFFFF' + transparencyHexCode

    const colorsAccent = generateWithTransparency(accentColor, containerBgColor, transparencyHexCode, darkMode)
    const colorsPrimary = generateWithTransparency(initialColorPrimary, containerBgColor, transparencyHexCode, darkMode)

    function saveDarkMode(darkMode: boolean) {
        localStorage.setItem('darkMode', darkMode.toString())
        setDarkMode(darkMode)
    }

    function saveAccentColor(color: string) {
        // If transparency is 00, then the user hit the reset button.
        if (color.length == 9 && color.slice(7) == '00') {
            console.log('cleared')
            color = initialColorAccent
        }
        localStorage.setItem('primaryColor', color)
        setAccentColor(color)
    }


    const globalThemeConfig: ThemeConfig = {
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
            colorPrimary: accentColor,
            borderRadius: 4,
            fontSize: 18,
            colorBgContainer: containerBgColor,
            fontFamily: '"Roboto Mono", monospace',
        },
        components: {
            Menu: { colorBgContainer: darkMode ? colorsPrimary[4] : colorsPrimary[3], horizontalItemBorderRadius: 8, itemBorderRadius: 8 }, //colorBgContainer: darkMode ? colors[2] : colors[3],
            Layout: { headerBg: darkMode ? colorsPrimary[4] : colorsPrimary[3], bodyBg: 'transparent', footerBg: containerBgColor },
            ColorPicker: { algorithm: true, borderRadius: 10, },
            Typography: { algorithm: true },
            Carousel: { colorBgContainer: colorsAccent[8] },
        }
    }

    return (
        // Global config provider for Ant Design.
        <ConfigProvider theme={globalThemeConfig}>
            {/* Theme provider to allow using the antd theme in custom styled components. */}
            <ThemeProvider theme={globalThemeConfig}>
                {/* Loads the global styles, using this instead of App.css */}
                <GlobalStyle />
                <AppLayout darkMode={darkMode} saveDarkMode={saveDarkMode} saveAccentColor={saveAccentColor} accentColor={accentColor} />
            </ThemeProvider>
        </ConfigProvider>

    )
}

export default App
