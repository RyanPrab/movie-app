import React from "react";
import styled from "styled-components";
import Image from 'next/image';

const Section = styled.div.attrs(() => ({
  className: `flex flex-col w-2/3 justify-center h-auto space-x-2`
}))``;

const ImageContainer = styled.div.attrs(() => ({
  className: `relative w-full h-96`
}))``;

const InfoContainer = styled.div.attrs(() => ({
  className: `flex-col space-y-4`
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
  className: `text-sm`
}))``;

export default function Detail(props) {
  const { movie } = props;
  const PlaceholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNs/Q4AAgcBfrwSE/wAAAAASUVORK5CYII=';
  const poster = movie?.Poster === "N/A" ? PlaceholderImage : movie?.Poster;
  console.log(movie);
  return (
    <Section>
      <ImageContainer>
        <Image
          src={movie?.Poster}
          alt={movie?.Title}
          layout="fill"
        />
      </ImageContainer>
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
    </Section>
  )
}
