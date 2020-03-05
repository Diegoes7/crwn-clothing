import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body {
    font-family: 'Open sans Condensed';
    padding: 20px 40px;

    @media screen and (max-width: 800px) {
        padding: 10px;
    }
}

a {
    text-decoration: none;
    color: black;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

`