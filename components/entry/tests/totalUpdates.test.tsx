import { render, screen } from '@/test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update cup subtotal when cups change', async () => {
  const user = userEvent.setup();

  render(<Options optionType="cups" />);

  // make sure total starts out at $0.00
  const cupSubtotal = screen.getByText('Cups: $', { exact: false });
  expect(cupSubtotal).toHaveTextContent('0.00');

  // select charcoal cup and check subtotal
  const charcoalInput = await screen.findByRole('radio', { name: 'Charcoal' });

  await user.click(charcoalInput);

  expect(cupSubtotal).toHaveTextContent('10.00');

  // select cream cup and check subtotal
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

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    // Test that the total starts out at $0.00
    const { unmount } = render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('0.00');

    unmount();
  });

  test('grand total updates properly if cup is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });

    // select cream cup and check grand total
    const creamInput = await screen.findByRole('radio', { name: 'Cream' });

    await user.click(creamInput);
    expect(grandTotal).toHaveTextContent('10.00');

    // add coconut fragrance and check grand total
    const coconutCheckbox = screen.getByRole('checkbox', { name: 'Coconut' });

    await user.click(coconutCheckbox);
    expect(grandTotal).toHaveTextContent('15.00');
  });
  test('grand total updates properly if fragrance is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });

    // add cedar fragrance and check grand total
    const cedarCheckbox = await screen.findByRole('checkbox', {
      name: 'Cedar',
    });
    await user.click(cedarCheckbox);
    expect(grandTotal).toHaveTextContent('5.00');

    // select cream cup and check grand total
    const creamInput = await screen.findByRole('radio', { name: 'Cream' });

    await user.click(creamInput);
    expect(grandTotal).toHaveTextContent('15.00');
  });
  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // select cream cup
    const creamInput = await screen.findByRole('radio', { name: 'Cream' });
    await user.click(creamInput);
    // grand total: $10.00

    // add cedar fragrance
    const cedarCheckbox = await screen.findByRole('checkbox', {
      name: 'Cedar',
    });
    await user.click(cedarCheckbox);
    // grand total: $15.00

    // add coconut fragrance
    const coconutCheckbox = screen.getByRole('checkbox', { name: 'Coconut' });
    await user.click(coconutCheckbox);
    // grand total: $20.00

    // remove cedar fragrance
    await user.click(cedarCheckbox);
    // grand total: $15.00

    // check grand total
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent('15.00');
    // remove coconut fragrance
    await user.click(coconutCheckbox);
    expect(grandTotal).toHaveTextContent('10.00');
    // grand total: $10.00
  });
});
