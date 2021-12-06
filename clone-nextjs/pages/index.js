import { gql, GraphQLClient } from 'graphql-request';
import styled from 'styled-components';

// import ImgSlider from '../components/ImgSlider';
import Viewers from '../components/Viewers';



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

  
  return (
    
      <Container>
        
        <Viewers />
      </Container>
    
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
