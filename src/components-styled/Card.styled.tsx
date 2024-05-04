import { Card as card } from "antd";
import styled, { css } from "styled-components";

const Card = styled(card) < { $size?: string, $noShadow?: boolean, $align?: string, $center?: boolean } >`
    
    
    width: 50%;
    margin: 15px ${(props) => props.$center ? 'auto' : ''};


    ${(props) => {
        switch (props.$size) {
            case "small":
                return css`width: 25%;`
            case 'large':
                return css`width: 75%;`
        }
    }}




    &:hover {
        box-shadow: 0 0 8px ${({ theme }) => theme.token.colorPrimaryHover};
    }



    @media screen and (max-width: 600px) {
        width: 100%;
        max-width: 100%;
        margin: 15px auto
    }
`


export default Card
