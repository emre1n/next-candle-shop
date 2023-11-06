import { rest } from 'msw';
import config from '../config';
import mockData from './data';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const handlers = [
  rest.get(`${config.api}/api/cups`, (req, res, ctx) => {
    return res(ctx.json(mockData.cups));
  }),
  rest.get(`${config.api}/api/fragrances`, (req, res, ctx) => {
    return res(ctx.json(mockData.fragrances));
  }),
  // rest.post(`${config.api}/api/auth/local`, (req, res, ctx) => {
  //   return res(ctx.json({ data: { jwt: 123455676 } }));
  // }),
  // rest.post(`${config.api}/api/orders`, async (req, res, ctx) => {
  //   await sleep(100);
  //   return res(ctx.json({ data: { data: { id: 123455676 } } }));
  // }),
  rest.post(`${config.api}/api/auth/local`, (req, res, ctx) => {
    // Simulate a successful authorization request
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          jwt: 'mocked_jwt_token',
        },
      })
    );
  }),

  rest.post(`${config.api}/api/orders`, (req, res, ctx) => {
    // Simulate a successful order creation request

    return res(
      ctx.status(201),
      ctx.json({
        data: {
          id: 'mocked_order_id',
        },
      })
    );
  }),
];
