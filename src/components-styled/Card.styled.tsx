import { Card as card } from "antd";
import styled from "styled-components";

const Card = styled(card)`
    width: 25%;
    margin: 10px;



    &:hover {
        box-shadow: 0 0 8px ${({ theme }) => theme.token.colorPrimaryHover};
    }



    @media screen and (max-width: 600px) {
        width: 100%;
        margin: 15px;
    }
`


export default Card
