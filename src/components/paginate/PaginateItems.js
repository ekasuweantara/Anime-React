import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Pagination } from 'src/helpers/Constants';
import PropTypes from 'prop-types'

const PaginateItems = ({ pageCount, handlePageClick, forcePage }) => {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        forcePage={forcePage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={Pagination.pageRangeDisplayed}
        pageCount={pageCount}
        previousLabel="<"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center mb-5 mt-3"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginateItems;

PaginateItems.propTypes = {
  pageCount: PropTypes.number,
  handlePageClick: PropTypes.func,
  forcePage: PropTypes.number
}
