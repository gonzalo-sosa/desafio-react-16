import { Component } from 'react';
import _ from 'lodash';
const DOTS = '...';

class Pagination extends Component {
  state = {
    currentPage: 1,
    paginationRange: [],
  };

  onNext = () => {
    this.props.onPageChange(this.props.currentPage + 1);
  };

  onPrevious = () => {
    this.props.onPageChange(this.props.currentPage - 1);
  };

  calculatePaginationRange = ({
    currentPage,
    totalCount,
    pageSize,
    siblingCount = 1,
  }) => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return _.range(1, totalPageCount);
    }

    /*
        Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
        Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = _.range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
        Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = _.range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
        Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = _.range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentPage !== this.props.currentPage ||
      prevProps.totalCount !== this.props.totalCount ||
      prevProps.pageSize !== this.props.pageSize
    ) {
      this.setState({
        paginationRange: this.calculatePaginationRange(this.props),
      });
    }
  }

  render() {
    const { onPageChange, currentPage } = this.props;

    const { paginationRange } = this.state;

    let lastPage = paginationRange[paginationRange.length - 1];

    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }

    return (
      <nav className="mx-auto">
        <ul className="pagination align-items-center p-2">
          <li className="page-item" onClick={this.onPrevious}>
            <button
              className="page-link"
              aria-label="Previous"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <li
                  key={`pagination-dots-${pageNumber}-${index}`}
                  className="page-item"
                >
                  <a className="page-link" href="#">
                    &#8230;
                  </a>
                </li>
              );
            }

            return (
              <li
                key={pageNumber}
                className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(pageNumber)}
              >
                <a className="page-link" href="#">
                  {pageNumber}
                </a>
              </li>
            );
          })}
          <li className="page-item" onClick={this.onNext}>
            <button
              className="page-link"
              disabled={currentPage === lastPage}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
