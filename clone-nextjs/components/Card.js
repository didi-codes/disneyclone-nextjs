import styled from 'styled-components'

const Card = ({ thumbnail }) => {
    return (
       <CardImg  src={thumbnail.url} alt={thumbnail.title}/>  
    )  
}

export default Card

const CardImg = styled.img`
    width: 200px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgb(0 0 0/ 69%) 0 26px 30px -10px, rgb(0 0 0 / 73%) 0 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
        transform: scale(1.05)
        box-shadow: rgb(0 0 0 / 80%) 0 40px 58px -16px, rgb(0 0 0 / 72%) 0 30px 22px -10px;
        border-color: rgba(249, 249, 249, 0.8);
    }
`
