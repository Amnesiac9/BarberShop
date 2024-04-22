import React from 'react';
import './App.css'
import AppLayout from './AppLayout'
import { ConfigProvider, theme } from 'antd';
import { generate } from '@ant-design/colors';
// import { purple } from '@ant-design/colors';
import type { ThemeConfig, } from 'antd';

// type Color = GetProp<ColorPickerProps, 'value'>; // ColorPickerProps, GetProp

const { darkAlgorithm, defaultAlgorithm } = theme;
const initialColorPrimary = '#001529'


const initialColorAccent = '#b31cec'

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

// const transparencyHexCode = '99' // Not 99%


function App() {
    // const [themeConfig, setThemeConfig] = React.useState(globalThemeConfig)
    const [darkMode, setDarkMode] = React.useState(getInitialDarkMode())
    const [accentColor, setAccentColor] = React.useState<string>(getInitialAccentColor())

    const colorsAccent = generateWithTransparency(accentColor)
    const colorsPrimary = generateWithTransparency(initialColorPrimary)

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

    // Append the transparancy code to them since generate does not return transparency.
    function generateWithTransparency(color: string) {
        const generated = generate(color, {
            theme: darkMode ? 'dark' : 'default',
            backgroundColor: darkMode ? '#000000' : '#ffffff'
        })
        for (let i = 0; i < generated.length; i++) {
            generated[i] = generated[i] + accentColor.slice(7)
        }
        return generated
    }

    const globalThemeConfig: ThemeConfig = {
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
            colorPrimary: accentColor,
            // borderRadius: 4,
            fontSize: 18,
            colorBgContainer: darkMode ? '#000000C1' : '#969696C1'
        },
        components: {
            Menu: { colorBgContainer: 'transparent', horizontalItemBorderRadius: 8, itemBorderRadius: 8, }, //colorBgContainer: darkMode ? colors[2] : colors[3],
            Layout: { headerBg: colorsPrimary[4], bodyBg: 'transparent', footerBg: darkMode ? '#000000EE' : '#969696C1' },
            ColorPicker: { algorithm: true, borderRadius: 10, },
            Typography: { algorithm: true }
        }
    }

    return (
        <ConfigProvider theme={globalThemeConfig}>
            <AppLayout darkMode={darkMode} saveDarkMode={saveDarkMode} saveAccentColor={saveAccentColor} accentColor={accentColor} />
        </ConfigProvider>

    )
}

export default App
