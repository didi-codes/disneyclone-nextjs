import React from 'react';
import styled from 'styled-components';

function Viewers() {
  

  const pauseMovie = (e) => {
    e.target.pause();
    console.log('off');
  };

  const startMovie = (e) => {
    e.target.play();
    console.log('on');
  };
  return (
    <VideoCardContainer>
      <VideoCard>
        <img
          src='/images/viewers-disney.png'
          className='videoCard-image'
          alt='viewers images'
        />
        <video
          src='videos/disney.mp4'
          onMouseEnter={startMovie}
          onMouseLeave={pauseMovie}
          mute="true"
          loop
          className='card-video'
        ></video>
      </VideoCard>
      <VideoCard>
        <img
          src='/images/viewers-pixar.png'
          className='videoCard-image'
          alt='viewers images'
        />
        <video
          src='videos/pixar.mp4'
          onMouseEnter={startMovie}
          onMouseLeave={pauseMovie}
          mute="true"
          loop
          className='card-video'
        ></video>
      </VideoCard>
      <VideoCard>
        <img
          src='/images/viewers-marvel.png'
          className='videoCard-image'
          alt='viewers images'
        />
        <video
          src='videos/marvel.mp4'
          mute="true"
          onMouseEnter={startMovie}
          onMouseLeave={pauseMovie}
          className='card-video'
          loop
        ></video>
      </VideoCard>
      <VideoCard>
        <img
          src='/images/viewers-starwars.png'
          className='videoCard-image'
          alt='viewers images'
        />
        <video
          src='videos/star-wars.mp4'
          onMouseEnter={startMovie}
          onMouseLeave={pauseMovie}
          mute="true"
          loop
          className='card-video'
        ></video>
      </VideoCard>
      <VideoCard>
        <img
          src='/images/viewers-national.png'
          className='videoCard-image'
          alt='viewers images'
        />
        <video
          src='videos/national-geographic.mp4'
          onMouseEnter={startMovie}
          onMouseLeave={pauseMovie}
          mute="true"
          loop
          className='card-video'
        ></video>
      </VideoCard>
    </VideoCardContainer>
  );
}

export default Viewers;

const VideoCardContainer = styled.div`
position: relative;
width: 92%;
margin: auto;
height: 10vw;
display: flex;
margin-top: 30px
margin-bottom: 20px;
justify-content: space-between;
`;
const VideoCard = styled.div`
  position: relative;
  overflow: hidden;
  min-width: calc(100% / 5 - 10px);
  width: calc(100% / 5 - 10px);
  height: 100%;
  margin-top: 30px;
  border-radius: 10px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 69%) 0 26px 30px -10px,
    rgb(0 0 0 / 73%) 0 16px 10px -10px;

  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  .videoCard-image,
  .card-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-video {
    position: absolute;
    z-index: 10;
    
  }
  &:hover .videoCard-image{
    box-shadow: rgb(0 0 / 80%) 0 40px 58px -16px,
      rgb(0 0 0 / 72%) 0 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    display: none;
  }
`;
