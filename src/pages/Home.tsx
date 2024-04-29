import { Button, Carousel, Space } from 'antd';
import Schedule from '../components/Schedule';
import ImageCard from '../components/ImageCard';
import Divider from '../components-styled/Divider.styled';
import Card from '../components-styled/Card.styled';

function Homepage(props: { updatePath: (key: string) => void }) {

    return (
        <div >
            <Carousel >
                <ImageCard alt="Barber Shop Image" src="./barberCutting3.png" ><h3>Timeless Haircuts</h3> Affordable Prices</ImageCard>
                <ImageCard alt="Barber Shop Image" src="./barberCutting2.png" contentSide='right'><h3>"A true barbershop experience."</h3></ImageCard>
                <ImageCard alt="Barber Shop Image" src="./barberCutting1.png" ><h3>"Relaxing and Professional Atmosphere."</h3></ImageCard>
                <ImageCard alt="High Top Fade Haircut" src="./haircuts/High-Top-Fade.jpg" ></ImageCard>
                <ImageCard alt="Long-Hair-Slicked-Back-Shaved-Sides" src="./haircuts/Long-Hair-Slicked-Back-Shaved-Sides.jpg"></ImageCard>
                <ImageCard alt="Curly-Hair-Fade-Short" src="./haircuts/Curly-Hair-Fade-Short.jpg" ></ImageCard>
            </Carousel>
            <Divider />
            <Card $size='large' $noShadow>
                <h1>"Remarkable Precision and Expertise"</h1>
                <p>Experience a true barbershop shave and haircut.</p>
            </Card>
            <Schedule />
            <Button type="primary" size="large" onClick={() => props.updatePath('/book')}>Book Now</Button>
            <Space />
            <Divider />
        </div>
    )
}

export default Homepage
