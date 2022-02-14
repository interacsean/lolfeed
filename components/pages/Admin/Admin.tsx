import React from 'react';
import { NextPage } from 'next';
import Home from '../Home/Home';

const Admin: NextPage = () => {
  return <Home canEdit={true} />;
}

export default Admin;
