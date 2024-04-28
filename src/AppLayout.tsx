import React from "react";
import type { MenuProps } from 'antd';
import { Button, Layout } from "antd";
import Homepage from './pages/Home'
import CustomHeader from "./components/CusomHeader";
import Container from "./components-styled/Container.styled";
import Menu from './components-styled/Menu.styled'
import Gallery from "./pages/Gallery";

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
        label: 'HAIRCUTS',
        key: '/gallery'
    },
    {
        label: 'INFO',
        key: '/about'
    }
]

function AppLayout(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; saveAccentColor: (color: string) => void; accentColor: string; }) {

    const [path, setPath] = React.useState('/home')

    const updatePath: MenuProps['onClick'] = (e) => {
        // console.log(e)
        // console.log('Key:', e.key)
        // console.log('keyPath: ', e.keyPath)
        // console.log('domEvent: ', e.domEvent)
        setPath(e.key);
    };

    // This doesn't feel great, Ant Design made passing down a func to update the path unintuitive.
    // I tried just passing down setPath and setting that, and the screen updates, but the menu indicator doesn't change.
    // If there's a better way, please let me know!
    const bookNowClick = () => {
        if (items === undefined) {
            console.error("items is undefined.")
            return;
        }
        const nodes = document.querySelectorAll('.ant-menu-title-content');
        const item = nodes[1] as HTMLElement
        item.click()
    }

    return (
        <>
            <Layout>
                <CustomHeader {...props}></CustomHeader>
                <Content >
                    <Menu onClick={updatePath} mode='horizontal' items={items} defaultSelectedKeys={['/home']}>
                    </Menu>
                    <Button onClick={() => bookNowClick()}>C:LICSJd</Button>
                    <Container>
                        {path == '/home' && (<Homepage updatePath={bookNowClick} />)}
                        {path == '/gallery' && (<Gallery />)}
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
