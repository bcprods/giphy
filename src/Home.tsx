import React, { useState } from 'react';
import { useMount } from 'react-use';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import get from 'lodash/get';

import logo from './react.svg';
import './Home.css';

import GiphyService from './Services/Giphy';
import SearchBar from './components/SearchBar';
import Gif from './components/Gif';

const Home = () => {
  const [giphs, setGiphs] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataAsync = async (term: string) => {
    setLoading(true);
    try {
      const newGiphsResponse = await GiphyService.searchGiphyAsync(term);
      setGiphs(get(newGiphsResponse, 'data.data', []));
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useMount(async () => {
    await fetchDataAsync('dogs');
  });

  const renderLoader = () => (<CircularProgress />);

  const renderErrorMessage = () => (<div>Error!</div>);

  const renderGiphs = () => (
    <Grid container spacing={1}>
      {
        giphs.map((gif: any) => (
          <Grid
            key={`gif-container-${gif.id}`}
            item
            xs={4}
          >
            <a href={gif.url} target="_blank" rel="noreferrer">
              <Gif
                id={gif.id}
                url={get(gif, 'images.downsized.url')}
                name={gif.slug}
              />
            </a>
          </Grid>
        ))
      }
    </Grid>
  );

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzle</h2>
      </div>

      <div className="Container">
        { !loading && <SearchBar onSubmit={fetchDataAsync} /> }
        { loading && renderLoader() }
        { error && renderErrorMessage() }
        { !loading && renderGiphs() }
      </div>

      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
