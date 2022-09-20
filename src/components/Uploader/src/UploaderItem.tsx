import React from 'react';
import { safeInvoke, useStyles } from '@starleaguecompany/package-react-utils';
import { File, Trash, Warning } from '@starleaguecompany/react-icons';

import { UploaderItemProps } from '../types/Uploader.types';
import { Space } from '../../Space';
import { Icon } from '../../Icon';
import { Text } from '../../Typography';
import { Progress } from '../../Progress';

import styles from '../styles/Uploader.module.less';

/**
 * @description Uploader component.
 *
 * @component
 * @example
 * ```jsx
 * <Uploader.Item key={fileKey} file={file}/>
 * ```
 */

const UploaderItem = React.forwardRef<HTMLDivElement, UploaderItemProps>((props, ref) => {
  const { file, progressPercent, errorMessage, onRemove } = props;

  const [preview, setPreview] = React.useState('');

  const cx = useStyles(styles);
  const classNames = cx('uploaderItem', {
    error: errorMessage,
  });

  const textSpace = progressPercent ? 8 : 2;

  const fileIcon = React.useMemo(() => {
    if (errorMessage) {
      return (
        <Icon size={20}>
          <Warning />
        </Icon>
      );
    }

    if (preview) {
      return <img className={cx('filePreview')} src={preview} alt="preview" />;
    }

    return (
      <Icon className={cx('fileIcon')} size={20} shape="round">
        <File />
      </Icon>
    );
  }, [preview, errorMessage]);

  const handleRemove = React.useCallback(() => {
    safeInvoke(onRemove, file);
  }, [onRemove]);

  React.useEffect(() => {
    if (!file.type.match('image/*')) {
      setPreview('');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => reader.result && setPreview(reader.result.toString());
    }
  }, [file]);

  return (
    <Space ref={ref} data-qa="UploaderItem" size={12} align="center" className={cx(classNames)}>
      {fileIcon}
      <Space size={textSpace} direction="vertical" className={cx('textContainer')}>
        <Text size={16} strong truncate>
          {file.name}
        </Text>
        {progressPercent && <Progress percent={progressPercent} />}
        {errorMessage && <Text size={12}>{errorMessage}</Text>}
      </Space>
      {!errorMessage && <Icon size={20} icon={<Trash />} className={cx('removeIcon')} onClick={handleRemove} />}
    </Space>
  );
});

export default UploaderItem;
