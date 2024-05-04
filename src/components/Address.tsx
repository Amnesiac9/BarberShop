import Meta from "antd/es/card/Meta"
import Card from "../components-styled/Card.styled"
import Divider from "../components-styled/Divider.styled"

function Address() {

    return (
        <Card $center hoverable onClick={() => { navigator.clipboard.writeText('42 West Wallaby Way, Sydney, AU') }} >
            <h2>Street Address</h2>
            <Divider />
            <Meta description='42 West Wallaby Way, Sydney, AU' />
            <br />
        </Card>
    )
}

export default Address;
