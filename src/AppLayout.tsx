import React from 'react';
import { Layout, Menu, theme, ColorPicker, ThemeConfig } from "antd";
import { Color } from 'antd/es/color-picker';
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

function AppLayout(props: { setThemeConfig: React.Dispatch<React.SetStateAction<ThemeConfig>>; }) {

    const {
        token: { colorPrimary, colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    function updateThemeColor(color: Color) {
        props.setThemeConfig((prevConfig: ThemeConfig) => {
            return {
                ...(prevConfig),
                token: {
                    colorPrimary: color.toHexString(),
                }
            }
        })

    }

    return (
        <>
            <Layout>
                <Header style={{ position: 'sticky', top: 0, width: '100%', display: 'flex' }}>
                    <div className='logo'>LogoHere</div>
                    <Menu mode='horizontal' items={items} defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }}></Menu>
                    <div className='end'>
                        <ColorPicker showText value={colorPrimary} onChangeComplete={(color) => updateThemeColor(color)} />
                    </div>
                </Header>
                <Content style={{ padding: '0 48px', borderRadius: '25' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: '100vh',
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
