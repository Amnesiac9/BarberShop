import { Button, Carousel } from 'antd';
import StyledImage from '../components-styled/Img.styled';
import Schedule from '../components/Schedule';

function Homepage(props: { updatePath: () => void }) {

    return (
        <div >
            <Carousel autoplay>
                <div>
                    <StyledImage alt="Haircut1" src="./haircuts/High-Top-Fade.jpg" />
                </div>
                <div>
                    <StyledImage alt="Barber Shop Image" src="./haircuts/Long-Hair-Slicked-Back-Shaved-Sides.jpg" />
                </div>
                <div>
                    <StyledImage alt="Barber Shop Image" src="./haircuts/Curly-Hair-Fade-Short.jpg" />
                </div>
            </Carousel>
            <div>
                <h1>"Remarkable Precision and Expertise"</h1>
                <p>Experience a true barbershop shave and haircut.</p>

            </div>
            <Schedule />
            <Button type="primary" size="large" onClick={() => props.updatePath()}>Book Now</Button>

        </div>
    )
}

export default Homepage
