import { useState } from 'react';
import Modal from '@components/Modal/Modal';
import ButtonDownload from '@components/ButtonDownload/ButtonDownload';
import styles from './Leaf.module.scss';

const Leaf = ({ item }) => {
  const [displayModal, setdisplayModal] = useState(false);
  const date = new Date(item.timestamp).toLocaleDateString();
  const size = item.filesize / (1024 * 1024);
  return (
    <div data-testid='leaf' className={styles.leaf}>
      <div
        className={styles.leaf__image}
        data-testid='leaf-image'
        onClick={() => {
          setdisplayModal(true);
        }}
      >
        <img
          className={styles.leaf__thumpnail}
          src={item.url}
          alt={'loading'}
        />
      </div>
      <div className={styles.leaf__name}>
        <p>{item.name ? item.name : 'Unknown'}</p>
      </div>

      <div className={styles.leaf__info}>
        <p>Date: {date} </p>
        <p>Size: {size ? size.toFixed(2) + 'MB' : ''}</p>
      </div>
      <div className={styles.leaf__download_button}>
        <ButtonDownload url={item.url} name={item.name} />
      </div>
      <div>
        {displayModal && <Modal url={item.url} setDisplay={setdisplayModal} />}
      </div>
    </div>
  );
};

export default Leaf;
