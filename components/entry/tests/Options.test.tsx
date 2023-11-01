import { render, screen } from '@/test-utils/testing-library-utils';

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

test('Displays image for each fragrance option from server', async () => {
  // Mock Service Worker will return three fragrances from server
  render(<Options optionType="fragrances" />);

  // find images, expect 3 based on what msw returns
  const fragranceImages = await screen.findAllByRole('img', {
    name: /fragrance$/i,
  });
  expect(fragranceImages).toHaveLength(3);

  // check the actual alt text for the images
  // @ts-ignore
  const imageTitles = fragranceImages.map(img => img.alt);
  expect(imageTitles).toEqual([
    'Cedar fragrance',
    'Coconut fragrance',
    'Grapefruit fragrance',
  ]);
});
