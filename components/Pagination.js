import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const PaginationRoot = styled.div.attrs(props => ({
  className: `flex items-center justify-center py-6`
}))``;

const PaginationWrapper = styled.div.attrs(() => ({
  className: `flex items-center justify-center space-x-2`
}))``;

const PageCounter = styled.div.attrs((props) => ({
  className: `text-xs text-gray-500 rounded-lg border-2 shadow-md p-1 w-8 text-center cursor-pointer ${props.active && 'text-primary border-primary'}`
}))``;

const PaginationItem = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <PageCounter {...rest} ref={ref}>
      {children}
    </PageCounter>
  );
});

const Pagination = props => {
  const { currentPage, totalPages, currentPath } = props;
  const router = useRouter();
  const { slug, ...availableQuery } = router?.query;

  const emulatePages = (current, { min = 1, total, length = 3 } = {}) => {
    if (length > total) length = total;

    let start = current - Math.floor(length / 2);
    start = Math.max(start, min);
    start = Math.min(start, min + total - length);

    return Array.from({ length: length }, (el, i) => start + i);
  };

  const items = Array
    .from(emulatePages(currentPage, { min: 1, total: totalPages, length: 3 }))
    .map((n, i) => {
      return (
        <PaginationItem
          key={i}
          active={Number(currentPage) === n}
          onClick={() => {
            router.query.page = String(n);
            router.push({
              pathname: router.pathname,
              query: router.query
            })
          }}
        >
          {n}
        </PaginationItem>
      );
    });

  return (
    <div className="container px-4 md:px-0">
      <PaginationRoot>
        <PaginationWrapper>
          <Link
            href={{
              pathname: currentPath,
              query: { ...availableQuery, page: String(Number(currentPage) - 1) }
            }}
            passHref
          >
            <PaginationItem control={true}>
              <AiOutlineLeft className="inline mb-1" />
            </PaginationItem>
          </Link>
          {items}
          <Link
            href={{
              pathname: currentPath,
              query: { ...availableQuery, page: String(Number(currentPage) + 1) }
            }}
            passHref
          >
            <PaginationItem control={true}>
              <AiOutlineRight className="inline mb-1" />
            </PaginationItem>
          </Link>
        </PaginationWrapper>
      </PaginationRoot>
    </div>
  );
};

export default Pagination;
