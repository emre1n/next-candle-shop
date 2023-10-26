import { rest } from 'msw';
import config from '../config';

export const handlers = [
  rest.get(`${config.api}/api/cups`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            attributes: {
              name: 'Charcoal',
              imagePath: '/images/cups/charcoal.avif',
              createdAt: '2023-10-18T12:52:33.365Z',
              updatedAt: '2023-10-18T13:03:33.921Z',
              publishedAt: '2023-10-18T12:53:45.785Z',
              image: {
                data: {
                  id: 1,
                  attributes: {
                    name: 'charcoal.avif',
                    alternativeText: null,
                    caption: null,
                    width: null,
                    height: null,
                    formats: null,
                    hash: 'charcoal_1c7ad49ff3',
                    ext: '.avif',
                    mime: 'image/avif',
                    size: 2.49,
                    url: '/uploads/charcoal_1c7ad49ff3.avif',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2023-10-18T13:03:22.379Z',
                    updatedAt: '2023-10-18T13:03:22.379Z',
                  },
                },
              },
            },
          },
          {
            id: 2,
            attributes: {
              name: 'Cream',
              imagePath: '/images/cups/cream.avif',
              createdAt: '2023-10-18T12:53:31.597Z',
              updatedAt: '2023-10-18T13:04:06.889Z',
              publishedAt: '2023-10-18T12:53:52.328Z',
              image: {
                data: {
                  id: 2,
                  attributes: {
                    name: 'cream.avif',
                    alternativeText: null,
                    caption: null,
                    width: null,
                    height: null,
                    formats: null,
                    hash: 'cream_46cbaa9dc0',
                    ext: '.avif',
                    mime: 'image/avif',
                    size: 2.2,
                    url: '/uploads/cream_46cbaa9dc0.avif',
                    previewUrl: null,
                    provider: 'local',
                    provider_metadata: null,
                    createdAt: '2023-10-18T13:04:03.474Z',
                    updatedAt: '2023-10-18T13:04:03.474Z',
                  },
                },
              },
            },
          },
        ],
        meta: {
          pagination: {
            page: 1,
            pageSize: 25,
            pageCount: 1,
            total: 2,
          },
        },
      })
    );
  }),
];
