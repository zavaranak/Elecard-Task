import DownloadIcon from '@icons/DownloadIcon.svg';
import { useDispatch } from 'react-redux';
import { setAlertStatus } from '@store/appSlice';

const ButtonDownload = ({ url, name }) => {
  const dispatch = useDispatch();

  const downloadHandler = () => {
    if (!url) {
      dispatch(setAlertStatus('errorDownload'));
    } else {
      dispatch(setAlertStatus('download'));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = name ? name : 'unnamed_image';
      anchor.click();
    }
  };

  return (
    <div>
      <DownloadIcon onClick={downloadHandler} data-testid={'button-download'} />
    </div>
  );
};

export default ButtonDownload;
