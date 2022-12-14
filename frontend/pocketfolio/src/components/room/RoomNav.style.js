// styled Component
import styled from 'styled-components';

// Navbar
export const Container = styled.div`
  // size
  padding: 0.5rem;
  width: calc(100vw - 1rem);
  height: 3.5rem;

  // position
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.side {
    width: calc(100vw - 1rem - 40rem);
    transition: all 0.25s ease;
  }

  @media screen and (max-width: 1200px) {
    &.side {
      width: calc(100vw - 1rem);
      transition: all 0.25s ease;
    }
  }
`;

// Logo
export const LogoContainer = styled.div`
  left: 1.5rem;
  top: 1.5rem;
  height: 90%;
  cursor: pointer;
`;
export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

// Nav Button
export const NavBotton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 16px;
  border: none;
  background-color: #e75452;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #d14745;
    color: #eee;
  }

  &:active {
    background-color: #c03f3c;
    color: #ddd;
    box-shadow: 0.5px 0.5px 0.5px #333;
  }
`;

// LoginDiv
export const LoginDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.p`
  padding-right: 10px;
`;
