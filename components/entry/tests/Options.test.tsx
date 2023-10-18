import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each cup option from server', async () => {
  render(<Options optionType="cups" />);

  // find images
  const cupImages = await screen.findAllByRole('img', { name: /cup$/i });
  expect(cupImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = cupImages.map(element => element.alt);
  expect(altText).toEqual(['Charcoal cup', 'Cream cup']);
});
