import { gql, GraphQLClient } from 'graphql-request'

export const getServerSideProps = async (pageContext) => {
    
    const url = process.env.ENDPOINT
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization": `Bearer ${process.env.GRAPH_CMS_TOKEN}`
        }
    })

    const pageSlug = pageContext.query.slug
    console.log(pageSlug)

    const videoQuery = gql`
        query($pageSlug: String!) {
            video(where: { slug: $pageSlug }) {
                createdAt,
                id,
                title,
                subtitle,
                description,
                seen,
                slug,
                tags,
                backgroundImg {
                    url
                },
                titleImg {
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
    `
    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(videoQuery, variables)
    const video = data.video

    return {
        props: {
            video,
        }
    }
}

const Video = ({ video }) => {
   console.log(video)
    return (
        <div>
            Video
        </div>
    )
}

export default Video;