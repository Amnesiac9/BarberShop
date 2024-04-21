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

    const colors = generate(primaryColor, {
        theme: darkMode ? 'dark' : 'default',
        backgroundColor: darkMode ? '#000000' : '#ffffff'
    })


    const globalThemeConfig: ThemeConfig = {
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
            colorPrimary: primaryColor,
            borderRadius: 2,
        },
        components: {
            Menu: { algorithm: darkAlgorithm, colorBgContainer: colors[2], horizontalItemBorderRadius: 8, itemBorderRadius: 8, },
            Layout: { algorithm: darkAlgorithm, headerBg: colors[2], },
        }
    }

    return (
        <ConfigProvider theme={globalThemeConfig}>
            <AppLayout darkMode={darkMode} saveDarkMode={saveDarkMode} savePrimaryColor={savePrimaryColor} />
        </ConfigProvider>

    )
}

export default App
