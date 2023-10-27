import { rest } from 'msw';
import config from '../config';
import mockData from './data';

export const handlers = [
  rest.get(`${config.api}/api/cups`, (req, res, ctx) => {
    return res(ctx.json(mockData.cups));
  }),
  rest.get(`${config.api}/api/fragrances`, (req, res, ctx) => {
    return res(ctx.json(mockData.fragrances));
  }),
];
