import React from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import styled from 'styled-components';


const ImgSlider = ({ videos }) => {
    let settings = {
        dots: true,
        infinte: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
  

  return (
    <Carousel>
      <Wrap {...settings}>
        {videos.map((video) => (
          <a key={video.id} href={`/video/${video.slug}`}>
            <img src={video.backgroundImg.url} alt={video.title} />
          </a>
        ))}
      </Wrap>
    </Carousel>
  );
};

export default ImgSlider;

const Carousel = styled(Slider)`
    margin-top: 20px;
    margin-bottom: 20px;
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

 
`;
const Wrap = styled(Slider)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 50% 5%;
    border-radius: 4px;
    border: 4px solid transparent;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
