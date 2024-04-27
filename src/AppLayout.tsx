
import React from "react";
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, ColorPicker } from "antd";
import DarkModeSwitch from './components/DarkModeSwitch';
import StyledTitle from './components-styled/Title.styled'
import Homepage from './pages/Home'

// import type { ColorPickerProps, GetProp } from 'antd';

const { Header, Content, Footer } = Layout
// const { Title } = Typography

// type Color = GetProp<ColorPickerProps, 'value'>;

// const items = new Array(3).fill(null).map((_, index) => ({
//     key: String(index + 1),
//     label: `nav ${index + 1}`,
// }));


const items: MenuProps['items'] = [
    {
        label: 'Home',
        key: '/home',
    },
    {
        label: 'Book Appointment',
        key: '/book',
    },
    {
        label: 'About',
        key: '/about'
    }
]

function AppLayout(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; saveAccentColor: (color: string) => void; accentColor: string; }) {

    const [path, setPath] = React.useState('/home')

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setPath(e.key);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    function toggleDarkMode() {
        props.saveDarkMode(!props.darkMode)
    }

    return (
        <>
            <Header style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                <div className='logoArea'>
                    <img src='/barber.png' width='75px' height='auto' />
                </div>
                {/* <Title className='font-jersey-25-regular' style={{ flex: 1, margin: 0 }}>Lucky Cuts Barbershop</Title> */}
                <StyledTitle size='large'>Lucky Cuts Barbershop</StyledTitle>
                <div className='settingsArea'>
                    <DarkModeSwitch checked={props.darkMode} onChange={toggleDarkMode} />
                    <ColorPicker size='small' value={props.accentColor} onChangeComplete={(color) => props.saveAccentColor(color.toHexString())} allowClear /> {/*disabledAlpha*/}
                </div>
            </Header>


            <Layout>
                <Header style={{ display: 'flex' }}>

                    <Menu onClick={onClick} mode='horizontal' items={items} defaultSelectedKeys={['/home']} style={{ flex: 1, minWidth: 50, width: '100%', height: '100%', justifyContent: 'center' }}>
                    </Menu>

                </Header>
                <Content >
                    <div
                        style={{
                            marginTop: 0,
                            padding: 24,
                            minHeight: '85vh',
                            background: colorBgContainer,
                        }}
                    >

                        {path == '/home' && (<Homepage />)}
                        {path == '/book' && (<p>book appointment</p>)}
                        {path == '/about' && (<p>about</p>)}


                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', fontSize: 14 }}>
                    Lucky Cuts Barbershop ©{new Date().getFullYear()} Created by John Moreau CSS247
                </Footer>
            </Layout>

        </>
    )
}

export default AppLayout
