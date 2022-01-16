import React from "react";
import Image from "next/image";
import styled from 'styled-components'

const Section = styled.div.attrs(() => ({
  className: `flex flex-col rounded-md shadow-md space-y-4 p-2 cursor-pointer`
}))``;

const ImageContainer = styled.div.attrs(() => ({
  className: `relative w-full h-64 md:h-80`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-md font-semibold`
}))``;

const InfoContainer = styled.div.attrs(() => ({
  className: `flex justify-between items-center`
}))``;

const Info = styled.div.attrs(() => ({
  className: `text-md`
}))``;

export default function Card(props) {
  const { movie } = props;
  const PlaceholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNs/Q4AAgcBfrwSE/wAAAAASUVORK5CYII=';
  console.log(movie);
  const poster = movie?.Poster === "N/A" ? PlaceholderImage : movie?.Poster;
  const title = movie?.Title;
  const type = movie?.Type;
  const year = movie?.Year;

  return (
    <Section>
      <ImageContainer>
        <Image
          src={poster}
          alt={title}
          layout="fill"
        />
      </ImageContainer>
      <Title>
        {title}
      </Title>
      <InfoContainer>
        <Info>
          {type}
        </Info>
        <Info>
          {year}
        </Info>
      </InfoContainer>
    </Section>
  )
}
