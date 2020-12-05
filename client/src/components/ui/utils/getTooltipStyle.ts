import { Direction } from '../../../shared/constants/common';

type Style = {
  position: string;
  margin?: string;
};

const getWrapperStyle = (direction: Direction): Style => {
  switch (direction) {
    case Direction.UP:
      return { position: 'bottom-full', margin: 'mb-2' };
    case Direction.DOWN:
      return { position: 'top-full', margin: 'mt-2' };
    case Direction.LEFT:
      return { position: 'right-full', margin: 'mr-2' };
    case Direction.RIGHT:
      return { position: 'left-full', margin: 'ml-2' };
  }
};

const getArrowStyle = (direction: Direction): Style => {
  switch (direction) {
    case Direction.UP:
      return { position: '-bottom-2' };
    case Direction.DOWN:
      return { position: '-top-2' };
    case Direction.LEFT:
      return { position: '-right-2' };
    case Direction.RIGHT:
      return { position: '-left-2' };
  }
};

const getTooltipStyle = (direction: Direction, arrow?: boolean): Style => {
  if (arrow) {
    return getArrowStyle(direction);
  }

  return getWrapperStyle(direction);
};

export default getTooltipStyle;
