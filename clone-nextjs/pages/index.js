import { gql, GraphQLClient } from 'graphql-request';
import styled from 'styled-components';

import ImgSlider from '../components/ImgSlider';
import Viewers from '../components/Viewers';
import Section from '../components/Section';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });

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
  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;

  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };

  return (
    <>
      <Navbar account={account} />
      <Container>
        <ImgSlider videos={videos} />
        <Viewers />
        <Videofeed>
          <a href="disney"><div className="franchise" id="disney"></div></a>
          <a href="#marvel"><div className="franchise" id="marvel"></div></a>
          <a href="pixar"><div className="franchise" id="pixar"></div></a>
          <a href="star-wars"><div className="franchise" id="star-wars"></div></a>
          <a href="nat-geo"><div className="franchise" id="nat-geo"></div></a>
          <Section
            genre={'Recommended for you'}
            videos={unSeenVideos(videos)}
          />
          <Section genre={'Family'} videos={filterVideos(videos, 'Family')} />
          <Section
            genre={'Animation'}
            videos={filterVideos(videos, 'Animation')}
          />
          <Section
            genre={'Adventure'}
            videos={filterVideos(videos, 'Adventure')}
          />
          <Section genre={'Drama'} videos={filterVideos(videos, 'Drama')} />
          <Section
            genre={'Science Fiction'}
            videos={filterVideos(videos, 'Science Fiction')}
          />
          <Section
            genre={'Action-Adventure'}
            videos={filterVideos(videos, 'Action-Adventure')}
          />
          <Section
            genre={'Coming of Age'}
            videos={filterVideos(videos, 'Coming of Age')}
          />
          <Section genre={'Fantasy'} videos={filterVideos(videos, 'Fantasy')} />
          <Section genre={'Action'} videos={filterVideos(videos, 'Action')} />
          <Section id="disney" genre={'Disney'} videos={filterVideos(videos, 'Disney')} />
          <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos, 'Pixar')} />
          <Section id="marvel" genre={'Marvel'} videos={filterVideos(videos, 'Marvel')} />
          <Section id="star-wars" genre={'Star Wars'} videos={filterVideos(videos, 'Star Wars')} />
          <Section id="nat-geo" genre={'National Geographic'} videos={filterVideos(videos, 'National Geographic')} />
        </Videofeed>
        <Footer />
      </Container>
    </>
  );
};
export default Home;

const Container = styled.main`
width: 100%
height: 200vh;
transition: opacity 200ms ease 0s;
background:rgb(26, 29, 41);
top: 0;


&::after {
  background: url("/images/home-background.png") center center / cover no-repeat fixed;
  content: "";
  position: absolute;
 inset: 0px;
 opacity: 1;
 transition: opacity 500ms ease 0s;
 z-index: -10;
`;

const Videofeed = styled.div`
  
`;
