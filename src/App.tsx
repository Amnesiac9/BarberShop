import './App.css'
import AppLayout from './AppLayout'
import { ConfigProvider, theme } from 'antd';
import { purple } from '@ant-design/colors';
import type { ThemeConfig } from 'antd';
import React from 'react';

const { darkAlgorithm } = theme;

// TODO: Switch algorithm based on user preference
const globalThemeConfig: ThemeConfig = {
    algorithm: darkAlgorithm,
    token: {
        colorPrimary: purple.primary,
        borderRadius: 2,

    },
    components: {
        Menu: { algorithm: true, horizontalItemBorderRadius: 8, itemBorderRadius: 8, },
        Layout: { algorithm: true, borderRadius: 8 },
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
