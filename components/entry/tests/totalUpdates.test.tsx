import { render, screen } from '@/test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update cup subtotal when cups change', async () => {
  const user = userEvent.setup();

  render(<Options optionType="cups" />);

  // make sure total starts out at $0.00
  const cupSubtotal = screen.getByText('Cups: $', { exact: false });
  expect(cupSubtotal).toHaveTextContent('0.00');

  // select Charcoal cup and check subtotal
  const charcoalInput = await screen.findByRole('radio', { name: 'Charcoal' });

  await user.click(charcoalInput);

  expect(cupSubtotal).toHaveTextContent('10.00');

  // select Cream cup and check subtotal
  const creamInput = await screen.findByRole('radio', { name: 'Cream' });

  await user.click(creamInput);

  expect(cupSubtotal).toHaveTextContent('10.00');
});

test('update fragrances subtotal when fragrances change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="fragrances" />);

  // make sure total starts out at $0.00
  const fragrancesTotal = screen.getByText('Fragrances: $', { exact: false });
  expect(fragrancesTotal).toHaveTextContent('0.00');

  // add cedar and check subtotal
  const cedarCheckbox = await screen.findByRole('checkbox', { name: 'Cedar' });
  await user.click(cedarCheckbox);
  expect(fragrancesTotal).toHaveTextContent('5.00');

  // add coconut and check subtotal
  const coconutCheckbox = screen.getByRole('checkbox', { name: 'Coconut' });
  await user.click(coconutCheckbox);
  expect(fragrancesTotal).toHaveTextContent('10.00');

  // remove coconut and check subtotal
  await user.click(coconutCheckbox);
  expect(fragrancesTotal).toHaveTextContent('5.00');
});
