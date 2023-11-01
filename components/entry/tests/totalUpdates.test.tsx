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
