import * as React from 'react';
import {
  useStyles,
  useBoolean,
  useMergedRef,
  usePositioner,
  useDebounceValue,
  error,
  safeInvoke,
} from '@starleaguecompany/package-react-utils';
import { Cross } from '@starleaguecompany/react-icons';

import { Z_INDEXES } from '../../../constants/zIndexes';

import { Portal } from '../../Portal';
import { Fade } from '../../Transition';
import { Space } from '../../Space';
import { Text } from '../../Typography';
import { Icon } from '../../Icon';

import { TooltipProps } from '../types/Tooltip.types';

import styles from '../styles/Tooltip.module.less';

/**
 * @description The Tooltip component is used to show more content of a target
 *
 * @component
 * @example
 * ```jsx
 * <Tooltip title="prompt text">
 *   <span>Tooltip will show on mouse enter or by taps on mobile.</span>
 * </Tooltip>
 * ```
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { title, content, footer, closable, placement, width, className, style, children, onClose, ...restProps } =
    props;

  const cx = useStyles(styles);
  const reference = React.useRef<Element | null>(null);
  const popper = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useBoolean(false);
  const visibleDebounce = useDebounceValue(visible, 300);
  const { referenceRef, popperRef, arrowRef, getReferenceProps, getPopperProps } = usePositioner({
    placement,
    offset: [0, 16],
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'right', 'bottom', 'left'],
        },
      },
    ],
  });

  const elementStyles: React.CSSProperties = React.useMemo(() => {
    const styles: React.CSSProperties = { ...style };
    styles.width = width;

    return styles;
  }, [style, width]);

  let triggerElement: React.ReactNode;

  // Ensure tooltip has only one child node
  const count = React.useMemo(() => React.Children.count(children), [children]);
  const condition = count === 0 || count > 1;

  if (condition) {
    error({
      condition,
      message: 'Ensure tooltip has only one child node',
    })();

    triggerElement = children;
  } else {
    const child = React.Children.only(children) as React.ReactElement & { ref: React.Ref<HTMLElement> };

    const handleMouseEnter = (event: React.MouseEvent) => {
      setVisible.on();
      safeInvoke(child.props.onMouseEnter, event);
    };

    const handleMouseLeave = (event: React.MouseEvent) => {
      setVisible.off();
      safeInvoke(child.props.onMouseLeave, event);
    };

    const handleTouchEnd = (event: React.TouchEvent) => {
      setVisible.toggle();
      safeInvoke(child.props.onTouchEnd, event);
    };

    const triggerProps = {
      ...child.props,
      ...getReferenceProps({}, reference),
      tabIndex: child.props.tabIndex ?? 0,
      className: cx('outlineNone', child.props.className),
      ref: useMergedRef(referenceRef, child.ref),
    };

    triggerProps.onMouseEnter = handleMouseEnter;
    triggerProps.onMouseLeave = handleMouseLeave;
    triggerProps.onTouchEnd = handleTouchEnd;

    triggerElement = React.cloneElement(child, triggerProps);
  }

  const handleClose = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setVisible.off();
      safeInvoke(onClose, event);
    },
    [onClose]
  );

  return (
    <React.Fragment>
      {triggerElement}
      <Portal>
        <Fade
          ref={popperRef}
          className={cx('bubble')}
          visible={visibleDebounce}
          unmountOnExit
          {...getPopperProps({ style: { zIndex: Z_INDEXES.TOOLTIP } }, popper)}
        >
          <div ref={arrowRef} className={cx('arrow')} />
          <div
            {...restProps}
            data-qa="Tooltip"
            ref={ref}
            className={cx(className, 'container')}
            style={elementStyles}
            onMouseEnter={setVisible.on}
            onMouseLeave={setVisible.off}
          >
            <Space direction="vertical" size={8}>
              {title && (
                <Space justify="space-between" size={8}>
                  <Text size={16} strong>
                    {title}
                  </Text>
                  {closable && <Icon className={cx('close')} icon={<Cross />} size={16} onClick={handleClose} />}
                </Space>
              )}
              {content && <Text size={14}>{content}</Text>}
              {footer && footer}
            </Space>
          </div>
        </Fade>
      </Portal>
    </React.Fragment>
  );
});

Tooltip.defaultProps = {
  placement: 'top',
  width: 300,
};

export default Tooltip;
