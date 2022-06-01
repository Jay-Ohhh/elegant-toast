import { styled, keyframes } from 'goober';

const circleAnimation = keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`;

const checkmarkAnimation = keyframes`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`;

export interface CheckmarkTheme {
  primary?: string;
  secondary?: string;
}

const CheckmarkIcon = styled('div')<CheckmarkTheme>`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(p) => p.primary || '#61d345'};
  position: relative;
  transform: rotate(45deg);

  animation: ${circleAnimation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: 100ms;
  &:after {
    position: absolute;
    bottom: 6px;
    left: 6px;
    box-sizing: border-box;
    width: 6px;
    height: 10px;
    border-color: ${(p) => p.secondary || '#fff'};
    border-right: 2px solid;
    border-bottom: 2px solid;
    opacity: 0;
    animation: ${checkmarkAnimation} 0.2s ease-out forwards;
    animation-delay: 200ms;
    content: '';
  }
`;

export default CheckmarkIcon;
