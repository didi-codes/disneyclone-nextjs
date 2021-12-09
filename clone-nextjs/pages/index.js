import { gql, GraphQLClient } from 'graphql-request';
import styled from 'styled-components';

import ImgSlider from '../components/ImgSlider';
import Viewers from '../components/Viewers';
import Section from '../components/Section';
import Navbar from '../components/Navbar';



export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": `Bearer ${process.env.GRAPH_CMS_TOKEN}`,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        createdAt,
        id,
        description,
        title,
        subtitle,
        seen,
        slug,
        tags,
        titleImg {
          url
        },
        backgroundImg {
          url
        },
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;

  return {
    props: {
      videos,
    },
  };
};


const Home = ({ videos }) => {
  const filterVideos = (videos, genre) => {
    return videos.filter(video => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }
  
  return (
    <> 
    <Navbar />
     <Container>
        <ImgSlider videos={videos} />
        <Viewers />
        <Videofeed>
          <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
          <Section genre={"Family"} videos={filterVideos(videos, "Family")} />
          <Section genre={"Animation"}  videos={filterVideos(videos, "Animation")} />
          <Section genre={"Adventure"} videos={filterVideos(videos, "Adventure")} />
          <Section genre={"Drama"} videos={filterVideos(videos, "Drama")}/>
          <Section genre={"Science Fiction"} videos={filterVideos(videos, "Science Fiction")} />
          <Section genre={"Action-Adventure"} videos={filterVideos(videos, "Action-Adventure")} />
          <Section genre={"Coming of Age"} videos={filterVideos(videos, "Coming of Age")} />
          <Section genre={"Fantasy"} videos={filterVideos(videos, "Fantasy")} />
          <Section genre={"Action"} videos={filterVideos(videos, "Action")} />
          <Section genre={"Musical"} videos={filterVideos(videos, "Musical")} />
        </Videofeed>
      </Container>
    </>
     
    
  );
};
export default Home;

const Container = styled.main`
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
`;

const Videofeed = styled.div`
  display: flex;
  flex-direction: column;
`
