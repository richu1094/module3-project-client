import { Button } from 'react-bootstrap';
Link
import Carousel from 'react-bootstrap/Carousel';
import slide1 from './../../assets/img/slide/slide-1-final.jpg'
import slide2 from './../../assets/img/slide/slide-2-final.jpg'
import slide3 from './../../assets/img/slide/slide-3-final.jpg'
import './Hero.css';
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <div className='hero mb-3'>
            <Carousel>
                <Carousel.Item>
                    <img className="d-block w-100" src={slide1} alt="First slide" />
                    <Carousel.Caption>
                        <div className="caption-background">
                            <h1 className='title'>Share your ideas</h1>
                            <p className='paragraph'>This is a space for you to share your ideas with the world.</p>
                            <Button as={Link} to={"/sign-up"} variant="dark" size='lg'>Sign up today</Button>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={slide2} alt="Second slide" />
                    <Carousel.Caption>
                        <div className="caption-background">
                            <h1>Creators. Fans. Nothing in between.</h1>
                            <p>This gives you the opportunity to connect with your fans.</p>
                            <Button as={Link} to={"/sign-up"} variant="dark" size='lg'>Learn more</Button>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={slide3} alt="Third slide" />
                    <Carousel.Caption>
                        <div className="caption-background">
                            <h1>Turning ideas into reality</h1>
                            <p>This isn't just a platform for sharing ideas, it's a platform for turning ideas into reality.</p>
                            <Button as={Link} to={"/discover"} variant="dark" size='lg'>Discover</Button>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Hero