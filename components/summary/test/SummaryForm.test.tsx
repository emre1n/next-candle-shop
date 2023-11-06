import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', async () => {
  const user = userEvent.setup();

  render(<SummaryForm setOrderPhase={jest.fn()} />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('tooltip response to hover', async () => {
  const user = userEvent.setup();

  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const nullTooltip = screen.queryByRole('tooltip');
  const label = screen.getByText('I agree to', { exact: false });

  // tooltip starts out hidden
  expect(nullTooltip).not.toBeInTheDocument();

  // tooltip appears on mouseover of checkbox label
  await user.hover(label);
  const tooltip = screen.queryByRole('tooltip');

  expect(tooltip).toBeInTheDocument;

  // tooltip disappears when we mouse out
  await user.unhover(label);
  expect(tooltip).not.toBeInTheDocument();
});
