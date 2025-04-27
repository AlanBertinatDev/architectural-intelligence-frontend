import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: var(--sidebar-width);
  transition: margin-left var(--transition-normal);

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  padding: calc(var(--header-height) + var(--space-6)) var(--space-6)
    var(--space-6);
  min-height: 100vh;
`;

function Layout() {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
}

export default Layout;
