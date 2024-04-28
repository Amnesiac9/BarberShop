import styled, { css } from "styled-components";


const Card = styled.div < { flexDirection?: string } >`
    display: flex;
    flex-direction: column;
    margin: 25px auto;
    max-width: 50%;
    border-radius:  ${({ theme }) => theme.token.borderRadius + 'px'};
    /* border: 10px black solid; */
    box-shadow: 0 0 8px ${({ theme }) => theme.token.colorPrimary};


    ${(props) => {
        switch (props.flexDirection) {
            case "row":
                return css`
            flex-direction: row;
            `;
        }
    }}

`

export default Card;
