import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import { selectCardsInRange } from '../../../store/cardSlice';
import styles from './Page.module.scss';

const Page = ({ pageNumb, imagePerPage }) => {
  const startIndex = imagePerPage * (pageNumb - 1);
  const endIndex = startIndex + imagePerPage;
  const cardSelector = selectCardsInRange(startIndex, endIndex);
  const cards = useSelector(cardSelector);
  return (
    <div className={styles.page}>
      {cards.length > 0 &&
        cards.map((card, index) => (
          <Card key={index + card.filesize} cardInfo={card} />
        ))}
    </div>
  );
};
export default Page;
