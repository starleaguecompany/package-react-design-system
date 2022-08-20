import * as React from 'react'
import { useStyles } from '@starleaguecompany/package-react-utils'
import { ArrowLeft, ArrowRight } from '@starleaguecompany/react-icons'

import { Icon } from '../../Icon'
import { Space } from '../../Space'

import { CarouselProps } from '../types/Carousel.types'

import styles from '../styles/Carousel.module.less'

/**
 * @description A carousel component.
 *
 * @component
 * @example
 * ```jsx
 * <Carousel>
 *   <div>1</div>
 *   <div>2</div>
 * </Carousel>
 * ```
 */

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const { title, gradient, className, children, ...restProps } = props
  const cx = useStyles(styles)

  const [delta, setDelta] = React.useState(0)
  const [isReachedRight, setIsReachedRight] = React.useState(false)
  const [isReachedLeft, setIsReachedLeft] = React.useState(false)
  const [margin, setMargin] = React.useState(0)
  const [scrollPosition, setScrollPosition] = React.useState(0)
  const refWrapper = React.useRef<HTMLDivElement>(null)

  const isArrowsHidden = React.useMemo(() => scrollPosition === 0 && !isReachedRight, [isReachedRight])

  const slidesStyle = cx('slides', {
    gradient: gradient,
    leftGradient: isReachedLeft,
    rightGradient: isReachedRight,
  })

  const divStyle = React.useMemo(
    () =>
      ({
        '--position': `${margin}px`,
      } as React.CSSProperties),
    [margin]
  )

  const handleResize = React.useCallback(() => {
    const hasOverflow = !!refWrapper?.current && refWrapper.current.offsetWidth < refWrapper.current.scrollWidth
    if (!!refWrapper?.current && hasOverflow && delta === 0) {
      setDelta(refWrapper.current.offsetWidth - refWrapper.current.scrollWidth || 0)
    }

    setIsReachedRight(hasOverflow)
  }, [delta])

  const scroll = React.useCallback(
    (position: number) => {
      const hiddenElementsWidth =
        !!refWrapper?.current &&
        Array.from(refWrapper.current?.children)
          .slice(0, position)
          //@ts-ignore
          .reduce((acc, el) => acc + el.offsetWidth, 0)

      const openElementsWidth =
        !!refWrapper?.current &&
        Array.from(refWrapper.current?.children)
          .slice(position)
          //@ts-ignore
          .reduce((acc, el) => acc + el.offsetWidth, 0)

      if (
        position > 0 &&
        refWrapper?.current?.parentElement &&
        openElementsWidth < refWrapper.current.parentElement.offsetWidth
      ) {
        setMargin(delta)
        setScrollPosition(position)
      } else {
        setMargin(-hiddenElementsWidth)
        setScrollPosition(position)
      }

      setTimeout(() => handleResize(), 300)
      setIsReachedLeft(!!position)
    },
    [handleResize, delta, refWrapper]
  )

  const handleOnClickRightArrow = React.useCallback(() => {
    scroll(scrollPosition + 1)
  }, [scroll, scrollPosition])

  const handleOnClickLeftArrow = React.useCallback(() => {
    scroll(scrollPosition - 1)
  }, [scroll, scrollPosition])

  const handleWheelScroll = React.useCallback(e => {
    const isReachedRight = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth

    setIsReachedRight(!isReachedRight)
    setIsReachedLeft(e.target.scrollLeft !== 0)
  }, [])

  const slides = React.useMemo(
    () =>
      React.Children.map(children as React.ReactElement, child => (
        <div style={{ width: child.props.style?.width, height: child.props.style?.height }}>{child}</div>
      )),
    [children]
  )

  React.useEffect(() => {
    const cb = () => {
      const hasOverflow = !!refWrapper?.current && refWrapper.current.offsetWidth < refWrapper.current.scrollWidth
      if (!!refWrapper?.current && hasOverflow) {
        setDelta(margin + refWrapper.current?.offsetWidth - refWrapper.current?.scrollWidth || 0)
      }

      setIsReachedRight(hasOverflow)
    }
    window.addEventListener('resize', cb)

    return () => window.removeEventListener('resize', cb)
  }, [refWrapper, delta, scrollPosition])

  React.useEffect(() => {
    handleResize()
  }, [children])

  return (
    <div ref={ref} data-qa="Carousel" className={cx('container')} style={divStyle} {...restProps}>
      <Space justify="space-between" className={cx('header')}>
        <div className={cx('title')}>{title}</div>
        {!isArrowsHidden && (
          <Space align="end" size={12} className={cx('arrows')}>
            <Icon
              className={cx('arrow', 'leftArrow', { disabled: scrollPosition === 0 })}
              size={16}
              shape="round"
              onClick={handleOnClickLeftArrow}
            >
              <ArrowLeft />
            </Icon>
            <Icon
              className={cx('arrow', 'rightArrow', { disabled: !isReachedRight })}
              size={16}
              shape="round"
              onClick={handleOnClickRightArrow}
            >
              <ArrowRight />
            </Icon>
          </Space>
        )}
      </Space>
      <div className={slidesStyle}>
        <div ref={refWrapper} className={cx('wrapper')} onScroll={handleWheelScroll}>
          {slides}
        </div>
      </div>
    </div>
  )
})

export default Carousel
