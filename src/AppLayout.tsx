
import { Layout, Menu, theme, ColorPicker, Typography } from "antd";
import DarkModeSwitch from './components/DarkModeSwitch';
// import { Calendar } from "antd";
// import { DatePicker } from 'antd';
// import Header from './components/Header';
// import Footer from './components/Footer';


const { Header, Content, Footer } = Layout

const { Title } = Typography

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
            <Header style={{ alignContent: 'center' }}>

                <Title className='font-jersey-25-regular' style={{ margin: 0 }}>Lucky Cuts Barbershop</Title>

            </Header>


            <Layout>
                <Header style={{ position: 'sticky', top: 0, display: 'flex' }}>
                    <div className='logoArea'>
                        <img src='/barber.png' width='45px' height='auto' />
                    </div>
                    <Menu mode='horizontal' items={items} defaultSelectedKeys={['1']} style={{ backgroundColor: 'transparent', flex: 1, minWidth: 150, width: '100%', justifyContent: 'center' }}>
                    </Menu>
                    <div className='settingsArea'>
                        <DarkModeSwitch checked={props.darkMode} onChange={toggleDarkMode} />
                        <ColorPicker size='small' value={colorPrimary} onChangeComplete={(color) => props.savePrimaryColor(color.toHexString())} />
                    </div>
                </Header>
                <Content style={{ padding: '0 24px' }}>
                    <div
                        style={{
                            marginTop: 0,
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
                <Footer style={{ textAlign: 'center', fontSize: 14 }}>
                    Lucky Cuts Barbershop ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>

        </>
    )
}

export default AppLayout
