import Head from "next/head";
import React, { useState, useEffect } from "react";
import List from '../components/List';
import Layout from '../components/Layout';
import { useWishlistContext } from '../context/wishlist';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import styled from "styled-components";

const PaginationWrapper = styled.div.attrs(() => ({
  className: `flex items-center justify-center space-x-2 py-4`
}))``;

const PageCounter = styled.div.attrs((props) => ({
  className: `text-xs text-gray-500 rounded-lg border-2 shadow-md p-1 w-8 text-center ${props.active && 'text-blue-500 border-blue-500'}`
}))``;

export default function MyList(props) {
  const [{ wishlist }, { setWishlist }] = useWishlistContext();
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 5;
  const [limit, setLimit] = useState(itemsPerPage);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPageCount(Math.ceil(wishlist?.length / itemsPerPage));

    return () => {
      setPageCount(0);
    }
  });

  useEffect(() => {
    setLimit(itemsPerPage * page);
    setOffset(limit - itemsPerPage);
  }), [page];

  const pageNumber = new Array(pageCount).fill(' ');

  const movies = wishlist?.slice(offset, limit);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center flex-1 flex-shrink-0 justify-center space-y-4">
        <div className='text-xl font-bold'>
          My List
        </div>
        <List
          movies={movies}
        />
        <PaginationWrapper>
          <AiOutlineLeft
            className='text-blue-500'
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
          {
            pageNumber.map((item, index) => {
              const counter = index + 1;
              return (
                <PageCounter
                  key={index}
                  onClick={() => {
                    setPage(counter);
                  }}
                  active={counter === page}
                >
                  {counter}
                </PageCounter>
              )
            })
          }
          <AiOutlineRight
            className='text-blue-500'
            onClick={() => {
              if (page !== pageCount) {
                setPage(page + 1);
              }
            }}
          />
        </PaginationWrapper>
      </div>
    </Layout>
  )
}
