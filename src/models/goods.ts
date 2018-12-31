import { getList } from '@/services/goods';
export default {
  state: {
    list: [],
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

    }
  },
  reducers: {
    setList(state, action) {
      return {
        ...state,
        list: action.payload.list
      };
    }
  }
}
