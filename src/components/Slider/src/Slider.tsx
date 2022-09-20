import * as React from 'react';
import { useStyles, useBoolean } from '@starleaguecompany/package-react-utils';

import { SliderProps } from '../types/Slider.types';
import styles from '../styles/Slider.module.less';

const getLogarithmicValue = (min: number, max: number, position: number) => {
  // position will be between 0 and 100
  const minp = 0;
  const maxp = 100;

  // The result should be between min anв max
  const minv = Math.log(min || 1);
  const maxv = Math.log(max);

  // calculate adjustment factor
  const scale = (maxv - minv) / (maxp - minp);

  return Math.exp((position - minp) * scale + minv);
};

const getLogarithmicPosition = (min: number, max: number, value: number) => {
  // position will be between 0 and 100
  const minp = 0;
  const maxp = 100;

  // The result should be between min anв max
  const minv = Math.log(min || 1);
  const maxv = Math.log(max);

  // calculate adjustment factor
  const scale = (maxv - minv) / (maxp - minp);

  return minp + (Math.log(value) - minv) / scale;
};

const getPrecision = (value: number) => {
  if (value > 5000000) return 100000;
  if (value > 1000000) return 50000;
  if (value > 100000) return 10000;
  if (value > 1000) return 100;
  // if (value > 500) return 10;

  return 1;
};

const roundValue = (value: number) => {
  const precision = getPrecision(value);

  return Math.round(value / precision) * precision;
};

const correctNumberByRange = (min: number, max: number, value: number) => Math.min(max, Math.max(value, min));

const addEventsToDocument = (eventMap: { [event: string]: React.EventHandler<any> }) => {
  for (const key in eventMap) {
    document.addEventListener(key, eventMap[key], false);
  }
};

const removeEventsFromDocument = (eventMap: { [event: string]: React.EventHandler<any> }) => {
  for (const key in eventMap) {
    document.removeEventListener(key, eventMap[key], false);
  }
};

const getMousePosition = (event: React.MouseEvent<HTMLDivElement>) =>
  event.pageX - (window.scrollX || window.pageXOffset);

const getTouchPosition = (event: React.TouchEvent<HTMLDivElement>) =>
  event.touches[0].pageX - (window.scrollX || window.pageXOffset);

const pauseEvent = (event: React.SyntheticEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

/**
 * @description A Slider component for displaying current value and intervals in range
 *
 * @component
 * @example
 * ```jsx
 * <Slider min={1000} max={100000} step={1} value={value} onChange={handleChange} />
 * ```
 */
// eslint-disable-next-line no-unused-vars
const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  // eslint-disable-next-line no-unused-vars
  const { value = 0, min = 0, max = 100, step = 1, disabled, logarithmic, onChange, className, ...restProps } = props;
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [sliderBound, setSliderBound] = React.useState<number>(0);
  const [sliderStart, setSliderStart] = React.useState<number>(0);
  const [inProgress, setInProgress] = useBoolean(false);
  const cx = useStyles(styles);

  const classNamesInner = cx('inner', {
    disabled: disabled,
  });
  const classNamesTrack = cx('track', {
    disabled: disabled,
  });
  const classNamesHandler = cx('handler', {
    disabled: disabled,
    active: inProgress,
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    addEventsToDocument(getMouseEventMap());
    start(getMousePosition(event));
    pauseEvent(event);
  };

  const handleMouseUp = () => {
    end(getMouseEventMap());
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    pauseEvent(event);
    move(getMousePosition(event));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    start(getTouchPosition(event));
    addEventsToDocument(getTouchEventMap());
    pauseEvent(event);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    move(getTouchPosition(event));
  };

  const handleTouchEnd = () => {
    end(getTouchEventMap());
  };

  const handleChange = React.useCallback(
    (value: number) => {
      onChange && onChange(value);
    },
    [value]
  );

  const handleResize = () => {
    const slider = sliderRef.current;
    // @ts-ignore
    const sliderRect = slider.getBoundingClientRect();
    // @ts-ignore
    const sliderSize = slider.clientWidth;
    // const sliderMax = sliderRect.right;
    const sliderMin = sliderRect.left;
    // const sliderBound = sliderSize
    // const sliderLength = Math.abs(sliderMax - sliderMin);

    setSliderBound(sliderSize);
    setSliderStart(sliderMin);
  };

  const start = (position: number) => {
    setInProgress.on();
    handleChange(positionToValue(position));
  };

  const end = (eventMap: { [event: string]: React.EventHandler<any> }) => {
    setInProgress.off();
    removeEventsFromDocument(eventMap);
  };

  const move = (position: number) => {
    handleChange(positionToValue(position));
  };

  const getOffset = () => {
    let percent = ((value - min) / (max - min)) * 100;

    if (logarithmic) {
      percent = getLogarithmicPosition(min, max, value);
    }

    if (max === min) {
      percent = 100;
    }

    if (isNaN(percent)) {
      percent = 0;
    }

    return correctNumberByRange(0, 100, percent);
  };

  const positionToValue = (position: number): number => {
    const offset = calcOffsetFromPosition(position);
    const value = calcValue(offset);

    const valModStep = (value - min) % step;
    let alignedValue = value - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignedValue += valModStep > 0 ? step : -step;
    }

    alignedValue = parseFloat(alignedValue.toFixed(5));

    return correctNumberByRange(min, max, alignedValue);
  };

  const calcOffsetFromPosition = (position: number): number => {
    return position - sliderStart;
  };

  const calcValue = (offset: number) => {
    const ratio = offset / sliderBound;
    const value = logarithmic ? getLogarithmicValue(min, max, ratio * 100) : ratio * (max - min) + min;

    // round value if step doesnt present
    return step > 1 ? value : roundValue(value);
  };

  const getMouseEventMap = () => {
    return {
      mousemove: handleMouseMove,
      mouseup: handleMouseUp,
    };
  };

  const getTouchEventMap = () => {
    return {
      touchmove: handleTouchMove,
      touchend: handleTouchEnd,
    };
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, true);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize, true);
      removeEventsFromDocument(getMouseEventMap());
      removeEventsFromDocument(getTouchEventMap());
    };
  }, []);

  const offset = getOffset();
  const handlerStyles = { marginLeft: `${offset}%` };

  return (
    <div ref={ref} data-qa="Slider" className={className} {...restProps}>
      <div ref={sliderRef} className={classNamesInner} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
        <div className={classNamesTrack} />
        {!disabled && (
          <span
            className={classNamesHandler}
            style={handlerStyles}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        )}
      </div>
    </div>
  );
});

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

export default Slider;
