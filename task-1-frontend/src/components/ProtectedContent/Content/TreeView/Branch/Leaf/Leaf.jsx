import { useContext, useState } from 'react';
import Modal from '@content/Modal/Modal';
import ButtonDownload from '@content/ButtonDownload/ButtonDownload';
import styles from './Leaf.module.scss';
import { LanguageContext } from '@utils/textContext';

const Leaf = ({ item }) => {
  const [displayModal, setdisplayModal] = useState(false);
  const date = new Date(item.timestamp).toLocaleDateString();
  const size = item.filesize / (1024 * 1024);
  const languageContextTextLeaf = useContext(LanguageContext).text.tree.leaf;
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
        <p>
          {languageContextTextLeaf.date}: {date}{' '}
        </p>
        <p>
          {languageContextTextLeaf.size}: {size ? size.toFixed(2) + 'MB' : ''}
        </p>
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
