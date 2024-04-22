import React from 'react';
import './App.css'
import AppLayout from './AppLayout'
import { ConfigProvider, theme } from 'antd';
import { generate } from '@ant-design/colors';
// import { purple } from '@ant-design/colors';
import type { ThemeConfig } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

// TODO: Switch algorithm based on user preference
const initialColorPrimary = () => {
    return localStorage.getItem('primaryColor') ?? '#6eca89'
}
const initialDarkMode = () => {
    const darkMode = localStorage.getItem('darkMode')
    if (darkMode === null) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return darkMode === 'true'
}

const transparencyHexCode = '99' // Not 99%


function App() {
    // const [themeConfig, setThemeConfig] = React.useState(globalThemeConfig)
    const [darkMode, setDarkMode] = React.useState(initialDarkMode())
    const [primaryColor, setPrimaryColor] = React.useState(initialColorPrimary)

    function saveDarkMode(darkMode: boolean) {
        localStorage.setItem('darkMode', darkMode.toString())
        setDarkMode(darkMode)
    }

    function savePrimaryColor(color: string) {
        localStorage.setItem('primaryColor', color)
        setPrimaryColor(color)
    }

    // Generate theme based on primary color
    // Append the transparancy code to them
    const colors = (() => {
        const generated = generate(primaryColor, {
            theme: darkMode ? 'dark' : 'default',
            backgroundColor: darkMode ? '#000000' : '#ffffff'
        })
        for (let i = 0; i < generated.length; i++) {
            generated[i] = generated[i] + transparencyHexCode
        }
        return generated
    })();


    const globalThemeConfig: ThemeConfig = {
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
            colorPrimary: primaryColor,
            borderRadius: 4,
            fontSize: 18,
            colorBgContainer: darkMode ? '#000000C1' : '#FFFFFFB1'
        },
        components: {
            Menu: { colorBgContainer: darkMode ? colors[2] : colors[3], horizontalItemBorderRadius: 8, itemBorderRadius: 8, },
            Layout: { headerBg: darkMode ? colors[2] : colors[5], bodyBg: 'transparent', footerBg: darkMode ? '#000000EE' : '#969696C1' },
            ColorPicker: { algorithm: true, borderRadius: 10, },
            Typography: { algorithm: true }
        }
    }

    return (
        <ConfigProvider theme={globalThemeConfig}>
            <AppLayout darkMode={darkMode} saveDarkMode={saveDarkMode} savePrimaryColor={savePrimaryColor} />
        </ConfigProvider>

    )
}

export default App
