import styled, { css } from 'styled-components'


//TODO: Switch this size based on screen size
const StyledImage = styled.img < { size?: string } > `
width: 400px;
height: auto;
padding: 50px;
flex: 1;
text-align: center;
align-content: center;
align-items: center;
margin: auto;

${(props) => {
        switch (props.size) {
            case "small":
                return css`
            font-size: 25px;
            `;
            case "large":
                return css`
            font-size: 75px;
            `;
        }
    }}

`;


export default StyledImage
