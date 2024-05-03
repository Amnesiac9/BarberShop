import React from "react";
import type { MenuProps } from 'antd';
import { Layout } from "antd";
import Homepage from './pages/Home'
import CustomHeader from "./components/CusomHeader";
import Container from "./components-styled/Container.styled";
import Menu from './components-styled/Menu.styled'
import Gallery from "./pages/Gallery";
import Divider from "./components-styled/Divider.styled";
import BookAppointment from "./pages/Book";
import AboutPage from "./pages/About";

const { Content, Footer } = Layout



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

    const [key, setKey] = React.useState(0);

    const remount = () => {
        // Incrementing key value to force re-mount
        setKey(prevKey => prevKey + 1);
    };

    // This doesn't feel great, Ant Design made passing down a func to update the path unintuitive.
    // I tried just passing down setPath and setting that, and the screen updates, but the menu indicator doesn't change.
    // If there's a better way, please let me know!
    const clickMenuItem = (key: string) => {
        if (items === undefined) {
            console.error("items is undefined.")
            return;
        }
        const item = document.querySelector(`li[data-menu-id$="${key}"]`) as HTMLElement
        if (item === null) {
            console.error("list item is null.")
            return;
        }
        item.click()
    }

    return (
        <>
            <Layout>
                <CustomHeader {...props}></CustomHeader>
                <Content >
                    <Menu onClick={updatePath} mode='horizontal' items={items} defaultSelectedKeys={['/home']}>
                    </Menu>
                    <Divider $maxWidth={55} $marginBottom='0px' />
                    <Container>
                        {path == '/home' && (<Homepage updatePath={clickMenuItem} />)}
                        {path == '/gallery' && (<Gallery />)}
                        {path == '/book' && (<BookAppointment key={key} remount={remount} />)}
                        {path == '/about' && (<AboutPage />)}
                    </Container>
                </Content>
                <Divider $maxWidth={55} $marginBottom='0px' />
                <Footer style={{ textAlign: 'center', fontSize: 14 }}>
                    Lucky Cuts Barbershop ©{new Date().getFullYear()} Created by John Moreau CSS247
                </Footer>
            </Layout>

        </>
    )
}

export default AppLayout
