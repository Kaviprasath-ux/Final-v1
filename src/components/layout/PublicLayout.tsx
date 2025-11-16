import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '../navigation/MainNavigation';
import Footer from '../footer/Footer';

const PublicLayout: React.FC = () => {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer showNewsletter={true} />
    </>
  );
};

export default PublicLayout;
