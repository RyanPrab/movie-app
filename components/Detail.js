import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from 'next/image';
import useWishlistHandler from "../hooks/useWishlistHandler";

const Section = styled.div.attrs(() => ({
  className: `flex flex-col w-2/3 h-auto space-y-4`
}))``;

const ImageContainer = styled.div.attrs(() => ({
  className: `relative w-full md:w-1/2 h-96`
}))``;

const InfoContainer = styled.div.attrs(() => ({
  className: `flex-col space-y-4 items-start`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-lg font-semibold`
}))``;

const SubInfoContainer = styled.div.attrs(() => ({
  className: `flex flex-row space-x-4`
}))``;

const SubInfo = styled.div.attrs(() => ({
  className: `text-sm text-gray-500`
}))``;

const Plot = styled.div.attrs(() => ({
  className: `text-sm leading-normal text-justify`
}))``;

const WishlistButton = styled.button.attrs(props => ({
  className: `rounded-lg border-2 mt-8 py-2 text-sm text-white ${props.myWishlist ? 'bg-red-500' : 'bg-blue-500'}`
}))``;

export default function Detail(props) {
  const { movie } = props;
  const { loading, wishlist, addToWishlist, removeWishlist } = useWishlistHandler();

  const [exists, setExists] = useState(null);

  useEffect(() => {
    setExists(wishlist?.find(w => w.imdbRating === movie?.imdbRating));

    return () => {
      setExists(null);
    }
  });

  const PlaceholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNs/Q4AAgcBfrwSE/wAAAAASUVORK5CYII=';
  const poster = movie?.Poster === "N/A" ? PlaceholderImage : movie?.Poster;

  return (
    <Section>
      <div className="flex justify-center">
        <ImageContainer>
          <Image
            src={poster}
            alt={movie?.Title}
            layout="fill"
          />
        </ImageContainer>
      </div>
      <InfoContainer>
        <Title>
          {movie?.Title}
        </Title>
        <SubInfoContainer>
          <SubInfo>
            {movie?.Year}
          </SubInfo>
          <SubInfo>
            {movie?.imdbRating}
          </SubInfo>
          <SubInfo>
            {movie?.Runtime}
          </SubInfo>
        </SubInfoContainer>
      </InfoContainer>
      <Plot>
        {movie?.Plot}
      </Plot>
      <WishlistButton
        myWishlist={exists}
        onClick={() => {
          if (exists) {
            removeWishlist(movie)
          } else {
            addToWishlist(movie)
          }
        }}
      >
        {exists ? (
          'Remove from Wishlist'
        ) : (
          'Add to Wishlist'
        )}
      </WishlistButton>
    </Section>
  )
}
