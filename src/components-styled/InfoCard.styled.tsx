import styled, { css } from "styled-components";

const InfoCard = styled.div < { $size?: string, $flexDirection?: string, $noShadow?: boolean, $wrapForMobile?: boolean, $nowrap?: boolean, $align?: string } >`
    display: flex;
    flex-direction: column;
    margin: 0px auto 25px auto;
    padding: 25px 20px;
    max-width: 50%;
    /* align-items: center; */
    justify-content: space-evenly;
    border-radius:  ${({ theme }) => theme.token.borderRadius + 'px'};
    flex-wrap: ${(props) => (props.$nowrap ? 'nowrap' : 'wrap')};


   
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
        return props.$noShadow ? css`` : css`
            box-shadow: 0 0 8px ${({ theme }) => theme.token.colorPrimary};
            /* &:hover {
                box-shadow: 0 0 8px ${({ theme }) => theme.token.colorPrimaryHover};
            } */
         `
    }}

       
${(props) => {
        switch (props.$align) {
            case 'left':
                return css`
            align-items: left;
            align-content: left;
            text-align: left;
            `
            case 'right':
                return css`
            align-items: right;
            align-content: right;
            text-align: right;
            `

        }
    }}


${(props) => {
        if (props.$wrapForMobile) {
            return css`
                @media screen and (max-width: 600px) {
                    flex-wrap: wrap;
            }
            `
        }

    }
    }


@media screen and (max-width: 600px) {
        padding: 10px;
        max-width: 100%;
    }

`

export default InfoCard;
