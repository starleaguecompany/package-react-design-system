import * as React from 'react';
import {
  useStyles,
  useStateCallback,
  useBoolean,
  useMergedRef,
  usePositioner,
  noop,
  error,
  safeInvoke,
  isDefined,
} from '@starleaguecompany/package-react-utils';
import { Modifier } from '@popperjs/core';

import { Z_INDEXES } from '../../../constants/zIndexes';

import { Menu } from '../../Menu';
import { Portal } from '../../Portal';
import { Fade } from '../../Transition';

import { DropdownProps } from '../types/Dropdown.types';
import styles from '../styles/Dropdown.module.less';
import { SelectValue } from '../../../types/Select.types';

/**
 * @description Dropdown component.
 *
 * @component
 * @example
 * ```jsx
 * <Dropdown>content</Dropdown>
 * ```
 */
const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    defaultValue,
    value,
    placement,
    mode,
    options,
    className,
    children,
    onChange,
    onOpen,
    onClose,
    ...restProps
  } = props;

  const cx = useStyles(styles);
  const reference = React.useRef<Element | null>(null);
  const popper = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useBoolean(false);
  const isMultiple = mode === 'multiple';
  const [innerValue, setInnerValue] = useStateCallback<SelectValue | undefined>(
    isDefined(value) ? value : defaultValue
  );
  const isFirstRender = React.useRef(true);
  const minWidthModifier: Modifier<'minWidth', any> = {
    name: 'minWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      state.styles.popper.minWidth = '280px';
    },
  };
  const { referenceRef, popperRef, getReferenceProps, getPopperProps } = usePositioner({
    placement,
    modifiers: [minWidthModifier],
  });
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
    const child = React.Children.only(children) as React.ReactElement;

    const triggerProps = {
      ref: useMergedRef(referenceRef, ref),
      'data-qa': 'Dropdown',
      tabIndex: 0,
      className: cx('container', className, { active: visible }),
      onClick: setVisible.toggle,
      ...restProps,
      ...getReferenceProps({}, reference),
    };

    triggerElement = React.cloneElement(child, triggerProps);
  }

  const isActive = React.useCallback(
    (val: string | number) => {
      if (innerValue === undefined) {
        return false;
      }

      if (isMultiple && Array.isArray(innerValue)) {
        return innerValue.includes(val);
      }

      return innerValue === val;
    },
    [innerValue]
  );

  const setValue = (value: string | number | undefined): void => {
    if (isMultiple && value !== undefined) {
      const pos = ((innerValue as Array<string | number>) || []).indexOf(value);
      const data = [...((innerValue as Array<string | number>) || [])];

      if (pos >= 0) {
        data.splice(pos, 1);
      } else {
        data.push(value);
      }

      setInnerValue(data, val => {
        //TODO проверить типизацию в useStateCallback
        safeInvoke(onChange, val as SelectValue);
      });
      return;
    }

    setInnerValue(value, val => {
      //TODO проверить типизацию в useStateCallback
      safeInvoke(onChange, val as SelectValue);
    });
  };

  const handleSelect = (value: any) => () => {
    setValue(value);
    !isMultiple && setVisible.off();
  };

  const menu = React.useMemo(() => {
    if (!options) {
      return null;
    }

    return (
      <Menu className={cx('menu')}>
        {options.map(({ label, value, disabled, ...args }) => (
          <Menu.Item
            key={value}
            {...args}
            value={value}
            active={isActive(value)}
            disabled={disabled}
            onClick={disabled ? noop : handleSelect(value)}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [options, innerValue]);

  const view = React.useMemo(() => {
    return (
      <Portal>
        <Fade
          ref={popperRef}
          className={cx('bubble')}
          visible={visible}
          unmountOnExit
          {...getPopperProps({ style: { zIndex: Z_INDEXES.DROPDOWN } }, popper)}
        >
          <div className={cx('content')}>{menu}</div>
        </Fade>
      </Portal>
    );
  }, [visible, menu]);

  React.useEffect(() => {
    // @ts-ignore
    let timer = null;
    const listener = (event: Event) => {
      // @ts-ignore
      if (reference.current && reference.current.contains(event.target)) {
        return;
      }

      // @ts-ignore
      if (popper.current && popper.current.contains(event.target)) {
        if (isMultiple) {
          return;
        }

        timer = setTimeout(() => {
          setVisible.off();
        }, 200);
        return;
      }

      setVisible.off();
    };

    document.addEventListener('mousedown', listener);
    // document.addEventListener('touchstart', listener)

    return () => {
      // @ts-ignore
      timer && clearTimeout(timer);
      document.removeEventListener('mousedown', listener);
      // document.removeEventListener('touchstart', listener)
    };
  }, [reference, popper]);

  React.useEffect(() => {
    if (visible) {
      safeInvoke(onOpen);
      isFirstRender.current = false;
    } else {
      !isFirstRender.current && safeInvoke(onClose);
    }
  }, [visible]);

  React.useEffect(() => {
    isDefined(value) && setInnerValue(value);
  }, [value]);

  return (
    <React.Fragment>
      {triggerElement}
      {view}
    </React.Fragment>
  );
});

Dropdown.defaultProps = {
  placement: 'bottom-start',
};

export default Dropdown;
