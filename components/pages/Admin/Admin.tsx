import React from 'react';
import { NextPage } from 'next';
import Home from '../Home/Home';
import getComics from '../../../services/database/comics/getComics';
import useRemoteData from '../../../utils/hooks/useRemoteData';
import App from '../../../config/App';
import axios from 'axios';
import { ComicRecord } from '../../../services/database/comics/types';
import log from '../../../utils/logging/log';

const requestComics = () =>
  log(`Making request to: ${App.apiUri}/comic`) &&
  axios.get(`${App.apiUri}/comic`, { validateStatus: null });

const Admin: NextPage = (props) => {
  const { data: comics } = useRemoteData<ComicRecord[]>(requestComics);

  const comicsList = React.useMemo(() => comics?.map((c) => c.name), [comics]);
  return <Home canEdit={true} comicsList={comicsList || []} />;
};

export default Admin;
