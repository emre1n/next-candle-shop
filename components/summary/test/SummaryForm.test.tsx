import { render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('Checkbox enables button on first click and disables on second click', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

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

  render(<SummaryForm />);

  // tooltip starts out hidden
  const nullTooltip = screen.queryByText(/View our Terms and Conditions/i);
  expect(nullTooltip).not.toBeInTheDocument();

  // tooltip appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const tooltip = screen.getByText(/View our Terms and Conditions/i);
  expect(tooltip).toBeInTheDocument();

  // tooltip disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(tooltip).not.toBeInTheDocument();
});
