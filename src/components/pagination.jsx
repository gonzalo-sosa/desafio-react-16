import { usePagination } from '../hooks/usePagination';
const DOTS = '...';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav className='pagination'>
      <ul className={'pagination-container'}>
        <li className="pagination-item" onClick={onPrevious}>
          <button className="arrow left" disabled={currentPage === 1}></button>
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li key={pageNumber} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={pageNumber}
              className={`pagination-item ${pageNumber === currentPage ? 'selected' : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li className={'pagination-item'} onClick={onNext}>
          <button
            className="arrow right"
            disabled={currentPage === lastPage}
          ></button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
