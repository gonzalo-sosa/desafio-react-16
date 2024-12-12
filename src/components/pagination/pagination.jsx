import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  if (itemsCount < pageSize) return null;

  const totalPages = Math.ceil(itemsCount / pageSize)
  const pages = _.range(1, totalPages + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li class="page-item"><a class="page-link" href="#">Anterior</a></li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              href="#"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
      </ul>
    </nav>
  );
};

export default Pagination;