
import Meta from "antd/es/card/Meta"
import Schedule from "../components/Schedule"
import Services from "../components/Services"
import Card from "../components-styled/Card.styled"
import { Flex } from "antd"


function AboutPage() {
    return (
        <>
            <h1>Barbershop Info</h1>
            <Flex vertical>
                <Card hoverable onClick={() => { navigator.clipboard.writeText('42 West Wallaby Way, Sydney, AU') }} type='inner' title='Address' style={{ maxWidth: '95%', margin: '15px auto' }}>
                    <Meta description='42 West Wallaby Way, Sydney, AU' />
                </Card>
                <Card style={{ maxWidth: '95%', margin: '15px auto' }}>
                    <Schedule />
                </Card>
                <Services />
            </Flex>
        </>
    )

}

export default AboutPage
