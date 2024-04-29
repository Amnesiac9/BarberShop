import styled from 'styled-components'

// This pulls the antd theme object we create in App.tsx
// background: ${({ theme }) => theme.token.colorBgContainer}
const Container = styled.div` 
    margin-top: 0;
    padding: 0 24px;
    min-height: 85vh;
    /* background: ${({ theme }) => theme.token.colorBgContainer}  */
`

export default Container
