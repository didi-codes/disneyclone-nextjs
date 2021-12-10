import Card from './Card'
import styled from 'styled-components'




const Section = ({genre, videos}) => {
    return (
        <Container>
            <GenreTitle>{genre}</GenreTitle>
            <Carousel>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail} />
                    </a>
                ))}
            </Carousel>
        </Container>
    )
}

export default Section;

const Container = styled.div`
    margin-top: 30px;
    padding: 30px 0 26px;
`
const GenreTitle = styled.h3`
    color: #fff;
    letter-spacing: 1px;
    line-height: 1.5;
    font-size: 18px;
`
const Carousel = styled.div`
 display:flex; 
`
