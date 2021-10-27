import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import './SearchBar.css';

type SearchBarProps = {
  onSubmit: Function
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [term, setTerm] = useState<string>('');

  return (
    <Grid className="search-bar" container spacing={3}>
      <Grid item xs={12} sm={10}>
        <TextField
          id="search-input"
          label="Search for a gif..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          className="button"
          fullWidth
          onClick={() => onSubmit(term)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
