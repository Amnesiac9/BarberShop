
import Schedule from "../components/Schedule"
import Services from "../components/Services"
import Card from "../components-styled/Card.styled"
import Address from "../components/Address"
import { Flex } from "antd"


function AboutPage() {
    return (
        <>
            <Flex justify='center' vertical >
                <h1>Barbershop Info</h1>
                <Card $center>
                    <Schedule />
                </Card>
                <Address />
                <Services />
            </Flex>
        </>
    )

}

export default AboutPage
