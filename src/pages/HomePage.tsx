import { Button, Carousel, Space } from 'antd';
import Schedule from '../components/Schedule';
import ImageCard from '../components/ImageCard';
import Divider from '../components-styled/Divider.styled';
import InfoCard from '../components-styled/InfoCard.styled';

function Homepage(props: { updatePath: (key: string) => void }) {

    return (
        <div >
            <Carousel autoplay>
                <ImageCard alt='Barber Shop Image' src='./barberCutting3.png' ><h3>Timeless Haircuts</h3> Affordable Prices</ImageCard>
                <ImageCard alt='Barber Shop Image' src='./barberCutting2.png' contentSide='right'><h3>'A true barbershop experience.'</h3></ImageCard>
                <ImageCard alt='Barber Shop Image' src='./barberCutting1.png' ><h3>'Relaxing and Professional Atmosphere.'</h3></ImageCard>
                <ImageCard alt='High Top Fade Haircut' src='./haircuts/High-Top-Fade.jpg' ><h3>Modern Styles</h3> Old school feel.</ImageCard>
                <ImageCard alt='uzz-Cut-Fade' src='./haircuts/Buzz-Cut-Fade.jpg' contentSide='right'><h3>Precision Tools</h3> For a clean cut.</ImageCard>
                <ImageCard alt='Curly-Hair-Fade-Short' src='./haircuts/Curly-Hair-Fade-Short.jpg' ><h3>Versatility</h3> For all types of hair.</ImageCard>
            </Carousel>
            <Divider />
            <InfoCard $size='large' $noShadow>
                <h1>'Remarkable Precision and Expertise'</h1>
                <p>Experience a true barbershop shave and haircut.</p>
            </InfoCard>
            <InfoCard>
                <Schedule />
            </InfoCard>
            <Button type='primary' size='large' onClick={() => props.updatePath('/book')}>Book Now</Button>
            <Space />
            <Divider />
        </div>
    )
}

export default Homepage
