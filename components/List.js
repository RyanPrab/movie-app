import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
const Card = dynamic(() => import ('./Card'), { ssr: false });

const Section = styled.div.attrs(() => ({
  className: `container`
}))``;

const Content = styled.div.attrs(() => ({
  className: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6`
}))``;

export default function List(props) {
  const { movies } = props;
  return (
    <Section>
      <Content>
        {
          movies?.Search?.map((movie, index) => {
            return (
              <Card
                key={index}
                movie={movie}
              />
            )
          })
        }
      </Content>
    </Section>
  )
}
