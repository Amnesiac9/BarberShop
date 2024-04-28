import { Button, Carousel } from 'antd';
import StyledImage from '../components-styled/Img.styled';
import Schedule from '../components/Schedule';
import ImageCard from '../components/ImageCard';

function Homepage(props: { updatePath: (key: string) => void }) {

    return (
        <div >
            <Carousel >
                <ImageCard alt="High Top Fade Haircut" src="./haircuts/High-Top-Fade.jpg" ><h3>High Top Fade sdasdasdsa dsads uhsuiafhsdp uashdisuahdiusha</h3></ImageCard>
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
            <Button type="primary" size="large" onClick={() => props.updatePath('/book')}>Book Now</Button>

        </div>
    )
}

export default Homepage
