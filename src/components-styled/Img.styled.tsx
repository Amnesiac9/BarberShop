import styled from 'styled-components'




//TODO: Switch this size based on screen size
const StyledImage = styled.img`
width: 500px;
max-width: 500px;
height: auto;
padding: 10px;
/* flex: 1; */
text-align: center;
align-content: center;
align-items: center;
/* margin: auto; */



@media screen and (max-width: 600px) {
        max-width: 100%;
        padding: 0;
    }


`;


export default StyledImage
