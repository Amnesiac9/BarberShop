import React from 'react';
import { Layout, Menu, theme, ColorPicker } from "antd";
import DarkModeSwitch from './components/DarkModeSwitch';
// import { Calendar } from "antd";
// import { DatePicker } from 'antd';
// import Header from './components/Header';
// import Footer from './components/Footer';


const { Header, Content, Footer } = Layout

// const { getDesignToken } = theme;
// const globalToken = getDesignToken();

const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

function AppLayout(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; savePrimaryColor: (color: string) => void; }) {

    const {
        token: { colorPrimary, colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    function toggleDarkMode() {
        props.saveDarkMode(!props.darkMode)
    }



    return (
        <>
            <Layout>
                <Header style={{ position: 'sticky', top: 0, width: '100%', display: 'flex' }}>
                    <div className='logo'>LogoHere</div>
                    <Menu mode='horizontal' items={items} defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }}></Menu>
                    <div className='end'>
                        <DarkModeSwitch checked={props.darkMode} onChange={toggleDarkMode} />
                        <ColorPicker showText value={colorPrimary} onChangeComplete={(color) => props.savePrimaryColor(color.toHexString())} />
                    </div>
                </Header>
                <Content style={{ padding: '0 48px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '85vh',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Content
                        Content

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Lucky Cuts Barbershop ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>

        </>
    )
}

export default AppLayout
