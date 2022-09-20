import * as React from 'react';
import { isNull, safeInvoke, useBoolean, useMergedRef, useStyles } from '@starleaguecompany/package-react-utils';
import { UploadCloud } from '@starleaguecompany/react-icons';

import { Space } from '../../Space';
import { Button } from '../../Button';
import { Text } from '../../Typography';
import { Alert } from '../../Alert';
import { Icon } from '../../Icon';

import { UploaderProps } from '../types/Uploader.types';
import styles from '../styles/Uploader.module.less';

/**
 * @description Uploader component.
 *
 * @component
 * @example
 * ```jsx
 * <Uploader title="title">
 *   <Uploader.Item key={fileKey} file={file}/>
 * </Uploader>
 * ```
 */
const Uploader = React.forwardRef<HTMLInputElement, UploaderProps>((props, ref) => {
  const {
    title,
    description,
    dragZoneDescription,
    buttonCaption,
    multiple,
    accept,
    className,
    children,
    onChange,
    onFilesUpload,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    ...restProps
  } = props;

  const [isDragActive, setIsDragActive] = useBoolean(false);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const cx = useStyles(styles);
  const uploaderStyles = cx('uploadContainer', {
    dropZoneActive: isDragActive,
  });

  const uploadFiles = React.useCallback(
    (files: FileList) => {
      if (!files.length) return;

      const filesToUpload = [];

      const count = multiple ? files.length : 1;
      for (let i = 0; i < count; i++) {
        const file = files.item(i);

        if (!file) {
          continue;
        }

        accept ? file?.type.match(accept) && filesToUpload.push(file) : filesToUpload.push(file);
      }

      safeInvoke(onFilesUpload, filesToUpload);
    },
    [onFilesUpload]
  );

  const handleDragEnter = React.useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      safeInvoke(onDragEnter, event);

      if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
        setIsDragActive.on();
      }
    },
    [onDragEnter]
  );

  const handleDragLeave = React.useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      safeInvoke(onDragLeave, event);

      setIsDragActive.off();
    },
    [onDragLeave]
  );

  const handleDragOver = React.useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      safeInvoke(onDragOver, event);

      !isDragActive && setIsDragActive.on();
    },
    [isDragActive, onDragOver]
  );

  const handleDrop = React.useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragActive.off();

      safeInvoke(onDrop, event);

      if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        uploadFiles(event.dataTransfer.files);
        event.dataTransfer.clearData();
      }
    },
    [onDrop, uploadFiles]
  );

  const handleClick = React.useCallback(
    () => hiddenFileInput.current && hiddenFileInput.current.click(),
    [hiddenFileInput]
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      safeInvoke(onChange, event);

      if (!fileList) return;

      uploadFiles(fileList);
    },
    [uploadFiles, onChange]
  );

  const uploadedFiles = React.useMemo(() => {
    if (!React.Children.count(children)) return;

    return (
      <Space size={8} direction="vertical">
        {React.Children.map(children as React.ReactElement, child => {
          if (isNull(child)) return;

          return React.cloneElement(child, { ...child.props });
        })}
      </Space>
    );
  }, [children]);

  React.useEffect(() => {
    const ref = dropZoneRef?.current;

    if (ref) {
      ref.addEventListener('dragenter', handleDragEnter);
      ref.addEventListener('dragleave', handleDragLeave);
      ref.addEventListener('dragover', handleDragOver);
      ref.addEventListener('drop', handleDrop);
    }

    return () => {
      ref?.removeEventListener('dragenter', handleDragEnter);
      ref?.removeEventListener('dragleave', handleDragLeave);
      ref?.removeEventListener('dragover', handleDragOver);
      ref?.removeEventListener('drop', handleDrop);
    };
  }, [dropZoneRef, handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return (
    <Space data-qa="Uploader" className={cx(className)} size={16} direction="vertical">
      {title && <div className={cx('title')}>{title}</div>}
      {description && <Alert color="orange">{description}</Alert>}
      <div data-qa="DropZone" ref={dropZoneRef} className={uploaderStyles} onClick={handleClick}>
        <input
          ref={useMergedRef(hiddenFileInput, ref)}
          type="file"
          className={cx('uploadInput')}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          {...restProps}
        />
        <Space size={16} align="center">
          <Button className={cx('uploadButton')}>
            <Icon icon={<UploadCloud />} />
            {buttonCaption}
          </Button>
          <Text className={cx('uploadCaption')}>{dragZoneDescription}</Text>
        </Space>
      </div>
      {uploadedFiles}
    </Space>
  );
});

Uploader.defaultProps = {
  dragZoneDescription: 'Переместите файлы в данную область или нажмите "Загрузить"',
  buttonCaption: 'Загрузить',
};

export default Uploader;
