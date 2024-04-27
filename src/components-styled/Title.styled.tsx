import styled, { css } from 'styled-components'



// const StyledTitle = styled.div < { fontSize?: number } > `
// font-family: "Jersey 25", sans-serif;
// font-weight: 400;
// font-style: normal;
// flex: 1;
// margin: 0;


// ${props =>
//         props.fontSize &&
//         css`
//     font-size: ${props.fontSize}px;
// `};
// `


const StyledTitle = styled.div < { size?: string } > `
font-family: "Jersey 25", sans-serif;
font-weight: 400;
font-style: normal;
flex: 1;
margin: 0;
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


export default StyledTitle
