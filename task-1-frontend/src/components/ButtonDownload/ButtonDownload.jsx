import { useState } from 'react';
import DownloadIcon from '../../icons/DownloadIcon.svg';
import Alert from '../Alert/Alert';

const ButtonDownload = ({ url, name }) => {
  const [displayAlert, setDisplayAlert] = useState(false);
  const [status, setStatus] = useState('');

  const alertHandler = (message) => {
    setStatus(message);
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
  };
  const downloadHandler = () => {
    if (!url) {
      alertHandler('errorDownload');
      return;
    }
    alertHandler('download');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name ? name : 'unnamed_image';
    anchor.click();
  };

  return (
    <div>
      <DownloadIcon onClick={downloadHandler} data-testid={'button-download'} />
      {displayAlert && <Alert status={status} />}
    </div>
  );
};

export default ButtonDownload;
