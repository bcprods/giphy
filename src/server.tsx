import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './App';

let assets: any;

const syncLoadAssets = () => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

// eslint-disable-next-line no-nested-ternary
const cssLinksFromAssets = (_assets: { [x: string]: { css: any[]; }; }, entrypoint: string) => (_assets[entrypoint] ? _assets[entrypoint].css
  ? _assets[entrypoint].css.map((_asset) => `<link rel="stylesheet" href="${_asset}">`).join('') : '' : '');

// eslint-disable-next-line no-nested-ternary
const jsScriptTagsFromAssets = (_assets: any, entrypoint: string, extra = '') => (_assets[entrypoint] ? _assets[entrypoint].js
  ? _assets[entrypoint].js.map((_asset: any) => `<script src="${_asset}"${extra}></script>`).join('') : '' : '');

export const renderApp = (req: express.Request) => {
  const context: any = {};

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>,
  );

  if (context.url) {
    return { redirect: context.url };
  }
  const html = `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
  </html>`;

  return { html };
};

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const { html = '', redirect = false } = renderApp(req);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;
