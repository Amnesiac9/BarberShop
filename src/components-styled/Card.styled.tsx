import styled, { css } from "styled-components";

//TODO: Make Responsive
const Card = styled.div < { $size?: string, $flexDirection?: string, $noShadow?: boolean } >`
    display: flex;
    flex-direction: column;
    margin: 25px auto;
    padding: 25px 20px;
    max-width: 50%;
    /* align-items: center; */
    justify-content: space-evenly;
    border-radius:  ${({ theme }) => theme.token.borderRadius + 'px'};
   


    ${(props) => {
        switch (props.$flexDirection) {
            case "row":
                return css`
            flex-direction: row;
            `
        }
    }}

    ${(props) => {
        switch (props.$size) {
            case "small":
                return css`max-width: 25%;`
            case 'large':
                return css`max-width: 75%;`
        }
    }}

    ${(props) => {
        return props.$noShadow ? css`` : css`box-shadow:  0 0 8px ${({ theme }) => theme.token.colorPrimary};`
    }}

`

export default Card;
