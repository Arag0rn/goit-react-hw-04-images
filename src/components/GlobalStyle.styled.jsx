import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
h1,
h2,
h3,
h4,
h5,
p {
  margin: 0;
  padding: 0;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
address {
  font-style: normal;
}
a {
  text-decoration: none;
  color: inherit;
}

ul,
ol {
  list-style: none;
  padding-left: 0;
  margin: 0;
}
html {
    box-sizing: border-box;
    width: 100vw;
    overflow-x: hidden;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    color: #212121;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
`