
import Meta from "antd/es/card/Meta"
import Schedule from "../components/Schedule"
import Services from "../components/Services"
import Card from "../components-styled/Card.styled"


function AboutPage() {
    return (
        <>
            <h2>Barbershop Info</h2>
            <Card hoverable onClick={() => { navigator.clipboard.writeText('42 West Wallaby Way, Sydney, AU') }} type='inner' title='Address' style={{ maxWidth: '95%', margin: '15px auto' }}>
                <Meta description='42 West Wallaby Way, Sydney, AU' />
            </Card>
            <Schedule />
            <Services />
        </>
    )

}

export default AboutPage
