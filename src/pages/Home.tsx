
import { Carousel } from 'antd';
import StyledImage from '../components-styled/Img.styled';

function Homepage() {

    return (
        <div >
            <Carousel autoplay>
                <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                    <StyledImage alt="Haircut1" src="./haircuts/High-Top-Fade.jpg.webp" />
                </div>
                <div>

                </div>
            </Carousel>

        </div>
    )
}

export default Homepage
