import React from "react";
import type { MenuProps } from 'antd';
import { Layout } from "antd";
import Homepage from './pages/Home'
import CustomHeader from "./components/CusomHeader";
import Container from "./components-styled/Container.styled";
import Menu from './components-styled/Menu.styled'

// import type { ColorPickerProps, GetProp } from 'antd';

const { Content, Footer } = Layout
// const { Title } = Typography

// type Color = GetProp<ColorPickerProps, 'value'>;

// const items = new Array(3).fill(null).map((_, index) => ({
//     key: String(index + 1),
//     label: `nav ${index + 1}`,
// }));


const items: MenuProps['items'] = [
    {
        label: 'HOME',
        key: '/home',
    },
    {
        label: 'BOOK',
        key: '/book',
    },
    {
        label: 'INFO',
        key: '/about'
    }
]

function AppLayout(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; saveAccentColor: (color: string) => void; accentColor: string; }) {

    const [path, setPath] = React.useState('/home')

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setPath(e.key);
    };

    return (
        <>
            <Layout>
                <CustomHeader {...props}></CustomHeader>
                <Content >
                    <Menu onClick={onClick} mode='horizontal' items={items} defaultSelectedKeys={['/home']}>
                    </Menu>
                    <Container>
                        {path == '/home' && (<Homepage />)}
                        {path == '/book' && (<div><p>book appointment</p></div>)}
                        {path == '/about' && (<p>about</p>)}
                    </Container>
                </Content>
                <Footer style={{ textAlign: 'center', fontSize: 14 }}>
                    Lucky Cuts Barbershop ©{new Date().getFullYear()} Created by John Moreau CSS247
                </Footer>
            </Layout>

        </>
    )
}

export default AppLayout
