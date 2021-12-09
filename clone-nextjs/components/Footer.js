import React from 'react';
import Link from 'next/Link';
import styled from 'styled-components';

const Footer = () => {
  return (
    <div>
      <Container>
        <LogoHolder>
          <Link href='/'>
            <Logo src='/images/logo.svg' alt='logo' />
          </Link>
        </LogoHolder>
        <LinksHolder>
          <Links>
            <a>Privacy Policy</a>
            <a>Subscriber Agreement</a>
            <a>Your California Privacy Rights</a>
            <a> Do Not Sell My Personal Information</a>
          </Links>
          <Links>
            <a>Children's Online Privacy Policy</a>
            <a>Help</a>
            <a>Closed Captioning</a>
            <a>Supported Devices</a>
            <a>Gift Disney+</a>
            <a>About Us</a>
          </Links>
          <Links>
            <a>Disney+ Partner Program</a>
            <a>Internet-based Ads</a>
          </Links>
        </LinksHolder>
        <CopyRight>
            <p> <span>&copy;</span>Disney. All Rights Reserved.</p>
        </CopyRight>
      </Container>
    </div>
  );
};

export default Footer;

const Container = styled.div`
  background-color: #000;
  width: 100%;
  height: 275px;
  position: absolute;
  color: #fff;
  font-size: 11px;
`;

const LogoHolder = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
`;
const Logo = styled.img`
  width: 5%;
`;

const LinksHolder = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const Links = styled.div`
  display: flex;
  a {
    margin: 20px;
    
  }
`;

const CopyRight = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
