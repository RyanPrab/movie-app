import React from 'react';
import axios from 'axios';
import Head from 'next/head'
import List from '../components/List';
import Pagination from '../components/Pagination';

export default function App(props) {
  const { movies, currentPage } = props;
  const totalResults = movies?.totalResults;
  console.log(totalResults);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center flex-1 flex-shrink-0 justify-center space-y-4 pt-10">
        <div className='text-xl font-bold'>
          Movie List
        </div>
        <List
          movies={movies}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalResults}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const currentPage = query?.page || 1;

  const movieResp = await axios.get(`https://www.omdbapi.com/?s=inception&apikey=ce92ed13&page=${currentPage}`)
    .catch(err => {
      if (process.env.NODE_ENV === 'development') {
        console.error(err);
      }

      return null;
    });

  const movies = movieResp?.data;

  return {
    props: {
      movies: movies,
      currentPage: currentPage
    }
  }
}
