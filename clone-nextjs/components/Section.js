import Card from './Card'
import styled from 'styled-components'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section = ({genre, videos}) => {
    let settings = {
        dots: false,
        infinte: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <Container>
            <GenreTitle>{genre}</GenreTitle>
            <Carousel {...settings}>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail} />
                    </a>
                ))}
            </Carousel>
        </Container>
    )
}

export default Section;

const Container = styled.div`
    margin-top: 30px;
    padding: 30px 0 26px;
`
const GenreTitle = styled.h3`
    color: #fff;
    letter-spacing: 1px;
    line-height: 1.5;
    font-size: 18px;
`
const Carousel = styled(Slider)`

    ul li button {
        &before {
            font-size: 10px;
            color: rgb(150, 158, 171);
        }
    }

    li.slick-active button:before {
        color: #fff;
    }

    .slick-list {
        overflow: visible;
    }

    button {
        background-color: border-color: rgba(249, 249, 249, 5);
    }
    
`
