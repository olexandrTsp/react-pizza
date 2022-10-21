import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { types } from 'sass';

type PaginationProps = {
  curentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ curentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={curentPage - 1}
      previousLabel="<"
    />
  );
};
