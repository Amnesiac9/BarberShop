
import { Layout, Menu, theme, ColorPicker } from "antd";
import DarkModeSwitch from './components/DarkModeSwitch';
import StyledTitle from './components-styled/StyledTitle'
// import type { ColorPickerProps, GetProp } from 'antd';

const { Header, Content, Footer } = Layout
// const { Title } = Typography

// type Color = GetProp<ColorPickerProps, 'value'>;

const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

function AppLayout(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; saveAccentColor: (color: string) => void; accentColor: string; }) {

    const {
        token: { colorBgContainer }, // Can't use colorPrimary for color picker, transparency layer is lost.
    } = theme.useToken();

    function toggleDarkMode() {
        props.saveDarkMode(!props.darkMode)
    }


    return (
        <>
            <Header style={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                <div className='logoArea'>
                    <img src='/barber.png' width='45px' height='auto' />
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

                    <Menu mode='horizontal' items={items} defaultSelectedKeys={['1']} style={{ flex: 1, minWidth: 50, width: '100%', height: '100%', justifyContent: 'center' }}>
                    </Menu>

                </Header>
                <Content >
                    <div
                        style={{
                            marginTop: 0,
                            padding: 24,
                            minHeight: '85vh',
                            background: colorBgContainer,
                            // borderRadius: borderRadiusLG,
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
