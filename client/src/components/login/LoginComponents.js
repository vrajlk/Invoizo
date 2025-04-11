import styled from "styled-components";
// const show = keyframes`
//   0%, 49.99% {
// 		opacity: 0;
// 		z-index: 1;
// 	}

// 	50%, 100% {
// 		opacity: 1;
// 		z-index: 5;
// 	}
// `;

// const hide = keyframes`
//   0%, 49.99% {
//     opacity: 1;
//     z-index: 5;
//   }

//   50%, 100% {
//     opacity: 0;
//     z-index: 1;
//   }
// `

export const Container = styled.div`
  background-color: ${({ theme }) => theme === "dark" ? "#0f172a" : "#f8fafc"};
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 
              0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 400px;
  transition: background-color 0.3s ease-in-out;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  pointer-events: none;

  ${props =>
    props.signingIn !== true &&
    `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    pointer-events: all;
  `}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  opacity: 1;
  pointer-events: all;

  ${props =>
    props.signingIn !== true &&
    `
    transform: translateX(100%);
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  `}
`;


export const Form = styled.form`
  background-color: ${({ theme }) => theme === "dark" ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.7)"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
`;


export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  font-size: 2rem;
  color: ${({ isOverlay }) => (isOverlay ? '#ffffff' : '#1f2937')};
`;

export const Input = styled.input`
  background-color: ${({ theme }) => theme === "dark" ? "#1e293b" : "#f1f5f9"};
  color: ${({ theme }) => theme === "dark" ? "#fff" : "#0f172a"};
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:focus {
    outline: 2px solid ${({ theme }) => theme === "dark" ? "#60a5fa" : "#3b82f6"};
  }
`;


export const NewButton = styled.button`
  border-radius: 20px;
  border: 1px solid transparent;
  background: linear-gradient(to right, #1f2937, #374151); /* stone to slate */
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  box-shadow: 0 0 10px rgba(55, 65, 81, 0.4); /* soft outer glow */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(55, 65, 81, 0.6), 0 0 25px rgba(31, 41, 55, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to right, #334155, #1e293b);
    box-shadow: 0 0 12px rgba(148, 163, 184, 0.3);
  }
`;



export const GhostButton = styled(NewButton)`
  background: transparent;
  color: #1f2937;
  border: 2px solid #1f2937;
  box-shadow: none;

  &:hover {
    background: rgba(31, 41, 55, 0.05);
    box-shadow: 0 0 10px rgba(31, 41, 55, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    color: #f1f5f9;
    border: 2px solid #f1f5f9;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
    }
  }
`;



export const Anchor = styled.a`
  color: #1f2937;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #111827;
    text-decoration: underline;
    text-shadow: 0 0 3px rgba(31, 41, 55, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    color: #f1f5f9;

    &:hover {
      color: #ffffff;
      text-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
    }
  }
`;



export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;


export const Overlay = styled.div`
  background: linear-gradient(to right, #e2e8f0, #cbd5e1); /* light stone shades */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #1f2937; /* stone gray text */
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  box-shadow: inset 0 0 40px rgba(100, 116, 139, 0.2); /* subtle inner glow */

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to right, #1e293b, #334155); /* dark stone shades */
    color: #f1f5f9;
    box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.1);
  }

  ${props => (props.signingIn !== true ? `transform: translateX(50%);` : null)}
`;





export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  color: #1f2937; /* stone gray */
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
  }
`;


export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => (props.signingIn !== true ? `transform: translateX(20%);` : null)}
`;


export const Paragraph = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  text-align: center;
  color: ${props => (props.overlay ? '#f3f4f6' : '#1f2937')};

  @media (prefers-color-scheme: dark) {
    color: ${props => (props.overlay ? '#f3f4f6' : '#e5e7eb')};
  }
`;


