import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel={<GoChevronRight />}
      previousLabel={<GoChevronLeft />}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
