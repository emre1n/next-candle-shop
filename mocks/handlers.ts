import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/cups', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Charcoal', imagePath: '/images/cups/charcoal.avif' },
        { name: 'Cream', imagePath: '/images/cups/cream.avif' },
      ])
    );
  }),
];
