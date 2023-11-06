import EntryPage from '@/app/order/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  // Don't need to wrap in provider; already wrapped

  // destructure 'umount' from return value to use at the end of the test
  const { unmount } = render(<EntryPage />);

  // add cup and fragrances
  const creamInput = await screen.findByRole('radio', { name: 'Cream' });
  await user.click(creamInput);

  const cedarCheckbox = await screen.findByRole('checkbox', {
    name: 'Cedar',
  });
  await user.click(cedarCheckbox);

  const coconutCheckbox = screen.getByRole('checkbox', { name: 'Coconut' });
  await user.click(coconutCheckbox);

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order candle/i,
  });
  await user.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const cupHeading = screen.getByRole('heading', { name: 'Cup: $10.00' });
  expect(cupHeading).toBeInTheDocument();

  const fragrancesHeading = screen.getByRole('heading', {
    name: 'Fragrance Subtotal: $10.00',
  });
  expect(fragrancesHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('Cream Cup: $0.00')).toBeInTheDocument();
  expect(screen.getByText('Cedar')).toBeInTheDocument();
  expect(screen.getByText('Coconut')).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(confirmButton);

  // Expect 'loading' to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click 'new order' button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  await user.click(newOrderButton);

  // check that cup and fragrances subtotals have been reset
  const cupTotal = await screen.findByText('Cups: $0.00');
  expect(cupTotal).toBeInTheDocument();
  const fragranceTotal = await screen.findByText('Fragrances: $0.00');
  expect(fragranceTotal).toBeInTheDocument();

  // unmount the component to trigger cleanup and avoid
  // "not wrapped in act()" error
  unmount();
});
