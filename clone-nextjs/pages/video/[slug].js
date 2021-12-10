import React, { useState } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Slider from 'react-slick';
// import Card from '../../components/Card'

export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });

  const pageSlug = pageContext.query.slug;
  console.log(pageSlug);

  const videoQuery = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        createdAt
        id
        title
        subtitle
        description
        seen
        slug
        tags
        backgroundImg {
          url
        }
        titleImg {
          url
        }
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const videosQuery = gql`
    query {
      videos {
        createdAt
        id
        description
        title
        subtitle
        seen
        slug
        tags
        titleImg {
          url
        }
        backgroundImg {
          url
        }
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "ckvmbvyh4cudt0a30t41133pd" }) {
        username
        avatar {
          url
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };

  const data = await graphQLClient.request(videoQuery, variables);
  const video = data.video;

  const videoData = await graphQLClient.request(videosQuery);
  const videos = videoData.videos;

  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      video,
      videos,
      account,
    },
  };
};

const changeToSeen = async (slug) => {
  await fetch('/api/changeToSeen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug }),
  });
};

const Video = ({ video, account, videos }) => {
  let settings = {
    dots: false,
    infinte: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}
  const [watch, setWatch] = useState(false);
  return (
    <div>
      <Navbar account={account} />
      <Container>
        {!watch && (
          <Background>
            <img src={video.backgroundImg.url} alt={video.title} />
            <div className='overlay'></div>
          </Background>
        )}
        {!watch && (
          <ImageTitle>
            <img src={video.titleImg.url} alt='' />
          </ImageTitle>
        )}
        {!watch && (
          <Control>
            <PlayButton
              onClick={() => {
                changeToSeen(video.slug);
                watch ? setWatch(false) : setWatch(true);
              }}
            >
              <img src='/images/play-icon-black.png' alt='play' />
              <span>PLAY</span>
            </PlayButton>
            <TrailerButton>
              <img src='/images/play-icon-white.png' alt='trailer' />
              <span>Trailer</span>
            </TrailerButton>
            <AddButton>
              <span>+</span>
            </AddButton>
            <GroupWatchButton>
              <img src='/images/group-icon.png' alt='group watch' />
            </GroupWatchButton>
          </Control>
        )}
        {!watch && (
          <Subtitle>
            <p>
              {' '}
              {video.tags.join(' -  ')} <span>{video.subtitle}</span>
            </p>
          </Subtitle>
        )}
        {!watch && <Description>{video.description}</Description>}
        <Watching>
          {watch && (
            <video width='100%' controls>
              <source src={video.mp4.url} type='video.mp4' />
            </video>
          )}
        </Watching>
        <Suggested onClick={() => (watch ? setWatch(false) : null)}>
          <p>Suggested</p>
          {/* <Wrap {...settings}>
            {videos.map((suggested) => (
              <a key={suggested.id} href={`/suggested/${suggested.slug}`}>
                 <Card thumbnail={suggested.thumbnail} />
              </a>
            ))}
          </Wrap> */}
        </Suggested>
      </Container>
      <Footer />
    </div>
  );
};

export default Video;

const Container = styled.div`
    overflow-x: hidden;
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    color: #fff;

    &:before {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right 0;
        bottom: 0;
        transition: opacity 200ms ease 0s;
        z-index: -3;
    }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 1;
  transition: opacity 200ms ease 0;

  img {
    width: 100vw;
  }
  .overlay {
    background-image: radial-gradient(
      farthest-side at 73% 21%,
      transparent,
      rgb(26, 29, 41)
    );
    position: absolute;
    inset: 0px;
  }
`;
const ImageTitle = styled.div`
  margin-top: 60px;
  height: 30vh;
  width: 20vw;
  min-height: 170px;
  min-width: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const Control = styled.div`
  display: flex;
  align-items: center;
`;
const PlayButton = styled.div`
  border-radius: 4px;
  font-size: 15px;
  padding: 0 24px;
  margin-right: 22px;
  display: flex;
  align-items: center;
  height: 56px;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;
  color: #000;

  &:hover {
    background: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`;
const AddButton = styled.button`
  margin-right: 16px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    font-size: 30px;
    color: #fff;
  }
`;
const GroupWatchButton = styled(AddButton)`
  background: rgb(0, 0, 0);
`;
const Subtitle = styled.div`
    color: rgb(249, 249, 249);
    font-size 15px;
    min-height: 20px;
    margin-top: 26px;
    
    p {
        margin-right: 5px;
    }
    span {
        margin-left: 8px;
    }
`;
const Description = styled.div`
  max-width: 695px;
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
`;

const Watching = styled.div``;
const Suggested = styled(Slider)`
  
`;

const Wrap = styled(Slider)`
 
`;
