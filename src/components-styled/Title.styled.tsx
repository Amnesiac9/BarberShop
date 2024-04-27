import styled, { css } from 'styled-components'


const Title = styled.div < { size?: string } > `
font-family: "Jersey 25", sans-serif;
font-weight: 400;
font-style: normal;
flex: 1;
margin: 0 25px;
font-size: 50px;

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


// const Title = styled.div < { size?: string } > `
// font-family: "Jersey 25", sans-serif;
// font-weight: 400;
// font-style: normal;
// flex: 1;
// margin: 0 25px;
// font-size: clamp(2.7rem, 6vw, 4.5rem);
// `


export default Title
