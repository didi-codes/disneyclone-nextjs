import React, { useState, useEffect } from 'react';
import Link from 'next/Link';
import styled from 'styled-components';

const Navbar = ({ account }) => {
  const [colorChange, setColorChange] = useState('top');

  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 5) {
        setColorChange('moved');
      } else {
        setColorChange('top');
      }
    });
  }, []);
  return (
    <Nav
      style={{
        backgroundColor:
          colorChange === 'top' ? 'rgba(0, 0, 0, 0)' : 'rgb(9, 11, 19)'
      }}
    >
      <Link href='/'>
        <Logo src='/images/logo.svg' alt='logo' />
      </Link>
      <NavMenu>
        <a href='/'>
          <img src='/images/home-icon.svg' alt='home icon' />
          <span>HOME</span>
        </a>
        <a>
          <img src='/images/search-icon.svg' alt='home icon' />
          <span>SEARCH</span>
        </a>
        <a>
          <img src='/images/watchlist-icon.svg' alt='home icon' />
          <span>WATCHLIST</span>
        </a>
        <a>
          <img src='/images/original-icon.svg' alt='home icon' />
          <span>ORIGINALS</span>
        </a>
        <a>
          <img src='/images/movie-icon.svg' alt='home icon' />
          <span>MOVIES</span>
        </a>
        <a>
          <img src='/images/series-icon.svg' alt='home icon' />
          <span>SERIES</span>
        </a>
      </NavMenu>
      <User>
        <p>
          Welcome <span>{account.username}</span>
        </p>
        <UserImg src={account.avatar.url} alt={account.username}></UserImg>
      </User>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.div`
  width: 100%;
  height: 70px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 36px;
 
`;
const Logo = styled.img`
  cursor: pointer;
  width: 80px;
`;
const NavMenu = styled.div`
    display:flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        
        img {
            height: 20px;
            
        }
        
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
    `;
const User = styled.div`
  font-size: 13px;
  letter-spacing: 1.42px;
  display: flex;
  align-items: center;

  p {
    margin-right: 10px;
  }
`;
const UserImg = styled.img`
  object-fit: cover;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;
