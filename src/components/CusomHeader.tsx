import ColorPicker from "antd/es/color-picker";
import Title from "../components-styled/Title.styled";
import DarkModeSwitch from "./DarkModeSwitch";
import { Header } from "antd/es/layout/layout";
import Flex from "../components-styled/Flex.styled";
import styled from "styled-components";

const ResponsiveHeader = styled(Header)`
    display: flex;

    @media screen and (max-width: 600px) {
        
            height: 190px;
            flex-direction: column
        
    }

`

const SettingsArea = styled(Flex)`
        @media screen and (max-width: 600px) {

            position: absolute;
            top: 15px;
            right: 10px;
            width: 100px;

    }

`

function CustomHeader(props: { darkMode: boolean; saveDarkMode: (darkMode: boolean) => void; saveAccentColor: (color: string) => void; accentColor: string; }) {
    function toggleDarkMode() {
        props.saveDarkMode(!props.darkMode)
    }

    return (
        <ResponsiveHeader >
            <Flex>
                <img src='/barber.png' width='64px' height='auto' />
            </Flex>
            <Title size='large'>Lucky Cuts Barbershop</Title>
            <SettingsArea>
                <DarkModeSwitch checked={props.darkMode} onChange={toggleDarkMode} />
                <ColorPicker size='small' value={props.accentColor} onChangeComplete={(color) => props.saveAccentColor(color.toHexString())} allowClear /> {/*disabledAlpha*/}
            </SettingsArea>
        </ResponsiveHeader>
    )
}

export default CustomHeader
