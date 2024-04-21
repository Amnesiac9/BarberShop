import React from 'react';
import './App.css'
import AppLayout from './AppLayout'
import { ConfigProvider, theme } from 'antd';
// import { purple } from '@ant-design/colors';
import type { ThemeConfig } from 'antd';

const { darkAlgorithm } = theme;

// const initialColorPrimary = '#8d6eca'


// TODO: Switch algorithm based on user preference
const globalThemeConfig: ThemeConfig = {
    algorithm: darkAlgorithm,
    token: {
        colorPrimary: '4fac94',
        borderRadius: 2,
    },
    components: {
        Menu: { algorithm: darkAlgorithm, colorBgContainer: "#1c1924", horizontalItemBorderRadius: 8, itemBorderRadius: 8, },
        Layout: { algorithm: darkAlgorithm, headerBg: "#1c1924", },
    }
}

function App() {
    const [themeConfig, setThemeConfig] = React.useState(globalThemeConfig)

    return (
        <ConfigProvider theme={themeConfig}>
            <AppLayout setThemeConfig={setThemeConfig} />
        </ConfigProvider>

    )
}

export default App
