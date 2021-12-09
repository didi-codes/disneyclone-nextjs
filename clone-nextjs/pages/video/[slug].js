import { gql, GraphQLClient } from 'graphql-request';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
  const variables = {
    pageSlug,
  };

  const data = await graphQLClient.request(videoQuery, variables);
  const video = data.video;

  return {
    props: {
      video,
    },
  };
};

const Video = ({ video }) => {
    let settings = {
        dots: false,
        infinte: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    }
  return (
    <div>
      <Navbar />
      <Container>
        <Background>
          <img src={video.backgroundImg.url} alt={video.title} />
        </Background>
        <ImageTitle>
          <img src={video.titleImg.url} alt='' />
        </ImageTitle>
        <Control>
          <PlayButton>
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
        <Subtitle>{video.subtitle}</Subtitle>
        <Description>{video.description}</Description>
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

    &:before {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right 0;
        bottom: 0;
        z-index: -1;
    }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: 60% 0;
  }
`;
const ImageTitle = styled.div`
  margin-top: 60px;
  height: 30vh;
  width: 40vw;
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
  margin-top: 150px;
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
`;
const Description = styled.div`
  max-width: 760px;
  line-height: 1.4;
  font-size: 20px;
  margin-top: 16px;
  color: rgb(249, 249, 249);
`;
const Suggested = styled.div``;
