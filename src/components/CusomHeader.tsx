import ColorPicker from "antd/es/color-picker";
import Title from "../components-styled/Title.styled";
import DarkModeSwitch from "./DarkModeSwitch";
import { Header } from "antd/es/layout/layout";
import Flex from "../components-styled/Flex.styled";


function CustomHeader(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; saveAccentColor: (color: string) => void; accentColor: string; }) {
    function toggleDarkMode() {
        props.saveDarkMode(!props.darkMode)
    }

    return (
        <Header style={{ display: 'flex' }}>
            <Flex>
                <img src='/barber.png' width='64px' height='auto' />
            </Flex>
            <Title size='large'>Lucky Cuts Barbershop</Title>
            <Flex>
                <DarkModeSwitch checked={props.darkMode} onChange={toggleDarkMode} />
                <ColorPicker size='small' value={props.accentColor} onChangeComplete={(color) => props.saveAccentColor(color.toHexString())} allowClear /> {/*disabledAlpha*/}
            </Flex>
        </Header>
    )
}

export default CustomHeader
