import mockjs from 'mockjs';

export default {
  'GET /api/mediaList': mockjs.mock({
    'list|24': [{
      id: '@id',
      name: '@string',
      thumb: mockjs.Random.image('200x300'),
      'value|1-100': 150,
      'type|0-2': 1,
    }],
  }),
};
