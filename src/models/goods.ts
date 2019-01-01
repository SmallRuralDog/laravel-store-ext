import { getList, getSkus } from '@/services/goods';
export default {
  state: {
    list: [],
    skus: []
  },
  effects: {
    *list({ payload }, { call, put, select }) {
      const list: [] = yield select(state => state.goods.list)
      if (list.length <= 0) {
        const response = yield call(getList, payload);
        yield put({
          type: 'setList',
          payload: response,
        })
      }
    },
    *skus({ plyload }, { call, put }) {
      const response = yield call(getSkus, plyload)
      yield put({
        type: 'setSkus',
        payload: response
      })
    }
  },
  reducers: {
    setList(state, action) {
      return {
        ...state,
        list: action.payload.list
      };
    },
    setSkus(state, action) {
      return {
        ...state,
        skus: action.payload
      }
    }
  }
}
