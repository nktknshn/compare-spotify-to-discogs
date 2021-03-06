import React from 'react'
import styled, { keyframes } from 'app/styled';


const Spinner = (props?: { size: number }) =>
  <CssSpinner
    size={12}
    {...props} />


export const SmallSpinner = () => <Spinner size={10} />


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CssSpinner = styled.div<{ size: number }>`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  float:left;
  margin-right: 4px;

  border-top: 2px solid ${props => props.theme.textMainColor};
  border-right: 2px solid ${props => props.theme.textMainColor};
  border-bottom: 2px solid ${props => props.theme.textMainColor};
  border-left: transparent;
  background: transparent;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
`;

export default Spinner