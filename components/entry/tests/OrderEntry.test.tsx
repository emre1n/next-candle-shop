import { render, screen, waitFor } from '@/test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '@/mocks/server';
import config from '@/config';

test('handles error for cups and fragrances routes', async () => {
  server.resetHandlers(
    rest.get(`${config.api}/api/cups`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${config.api}/api/fragrances`, (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});
