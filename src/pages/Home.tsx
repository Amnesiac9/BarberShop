
import { Button, Carousel } from 'antd';
import StyledImage from '../components-styled/Img.styled';
import Schedule from '../components/Schedule';

function Homepage() {

    return (
        <div >
            <Carousel autoplay>
                <div>
                    <StyledImage alt="Haircut1" src="./haircuts/High-Top-Fade.jpg.webp" />
                </div>
                <div>
                    <StyledImage alt="Barber Shop Image" src="./haircuts/Long-Hair-Slicked-Back-Shaved-Sides.jpg.webp" />
                </div>
            </Carousel>
            <div>
                <h1>"Remarkable Precision and Expertise"</h1>
                <p>Experience a true barbershop shave and haircut.</p>
                <Button type="primary" size="large">Book Now</Button>
            </div>
            <Schedule />

        </div>
    )
}

export default Homepage
