import { gql, GraphQLClient } from 'graphql-request'

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : `Bearer ${process.env.GRAPH_CMS_TOKEN}`
    }
  })

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
      }
      thumbnail {
        url
      },
      mp4 {
        url
      }
    }
  }
  `
  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos

  return {
    props: {
      videos,
    }
  }
}

const Home = ({ videos }) => {
  console.log(videos)
  return (
    <div>
      
    </div>
  )
}
export default Home;