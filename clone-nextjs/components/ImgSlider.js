import React from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from 'styled-components';
import Card from './Card'


const ImgSlider = ({ videos }) => {
    console.log(videos)
    let settings = {
        dots: true,
        infinite: true,
        speed: 500, 
        slidesToShow: 1,
        sildesToScroll: 1,
        autoplay: true
    }

    return (
        <Carousel {...settings}>
            <Wrap>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail} />
                    </a>
                ))}
            </Wrap>
        </Carousel>
    )
}

export default ImgSlider;

const Carousel = styled(Slider)`
margin-top: 20px;

ul li button {
    &:before {
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
    z-index: 1;
}
`
const Wrap = styled.div`
cursor: pointer;
img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 4px solid transparent;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;

    &:hover {
        border: 4px solid rgba(249, 249, 249, 0.8);
    }
}
`