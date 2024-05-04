import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    #root {
        max-width: 1250px;
        margin: 0 auto;
        /* padding: 2rem; */
        text-align: center;
        width: 100%;
        /* Not sure why, but on some mobile screens the page would scroll for no reason into white space. */
        overflow-x: hidden;
    }

    body {
        margin: 0;
        background-color: transparent;
        background-image: url('/BarberShop.webp');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }

    
`

export default GlobalStyle
