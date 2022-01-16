import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Section = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 justify-center`
}))``;

const MenuWraper = styled.div.attrs(() => ({
  className: `flex flex-row justify-around p-4`
}))``;

const PageContainer = styled.div.attrs(() => ({
  className: `container`
}))``;

export default function Layout(props) {
  return (
    <Section>
      <MenuWraper>
        <Link href="/">
          Home
        </Link>
        <Link href="/my-list">
          My List
        </Link>
      </MenuWraper>
      <PageContainer>
        {props.children}
      </PageContainer>
    </Section>
  )
}
