import React from 'react';

type GifProps = {
  id: string,
  url: string,
  name: string,
};

const Gif = ({ id, url, name }: GifProps) => (
  <img id={id} src={url} alt={name} width="100%" />
);

export default Gif;
