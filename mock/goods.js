import mockjs from 'mockjs'
export default {
  'GET /api/goodsList': mockjs.mock({
    'list|100': [{
      name: mockjs.Random.image('200x200'),
      'value|1-100': 150,
      'type|0-2': 1
    }],
  })
}
