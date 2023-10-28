import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update cup subtotal when cups change', async () => {
  const user = userEvent.setup();

  render(<Options optionType="cups" />);

  // make sure total starts out at $0.00
  const cupSubtotal = screen.getByText('Cup: $', { exact: false });
  expect(cupSubtotal).toHaveTextContent('0.00');

  // select Charcoal cup and check subtotal
  const charcoalInput = await screen.findByRole('radio', { name: 'Charcoal' });

  await user.clear(charcoalInput);
  await user.click(charcoalInput);

  expect(cupSubtotal).toHaveTextContent('10.00');

  // select Cream cup and check subtotal
  const amberInput = await screen.findByRole('radio', { name: 'Amber' });

  await user.clear(amberInput);
  await user.click(amberInput);

  expect(cupSubtotal).toHaveTextContent('15.00');
});
