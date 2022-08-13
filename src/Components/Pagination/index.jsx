import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

export default function Pagination({ curentPage, onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage = {curentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
