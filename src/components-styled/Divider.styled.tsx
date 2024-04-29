import { Divider as divider } from "antd";
import styled from "styled-components";

const Divider = styled(divider) <{ $maxWidth?: number, $marginBottom?: string }>`
    max-width: ${(props) => props.$maxWidth || 70}%;
    min-width: 10%;
    margin: 30px auto;
    margin-bottom: ${(props) => props.$marginBottom}
`

export default Divider
