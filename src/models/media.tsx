import { getList } from '@/services/media';

export default {
  state: {
    visible: false,// 是否显示
    callBack: null,
    max: 0,
    selected: [],
    list: [],// 列表数据
  },
  effects: {
    // 显示弹窗并加载列表数据
    * show({ payload }, { call, put, select }) {
      yield put({ type: 'setShow', payload: payload });
      const media: Models.Media = yield select(state => state.media);
      if (media.list.length <= 0) {
        const response = yield call(getList);
        yield put({
          type: 'setList',
          payload: response,
        });
      }

    },
  },
  reducers: {
    // 设置弹窗显示
    setShow(state, action) {
      return {
        ...state,
        selected: action.payload.selected || [],
        max: action.payload.max || 0,
        callBack: action.payload.callBack,
        visible: true,
      };
    },
    // 隐藏弹窗
    hide(state, action) {
      return {
        ...state,
        visible: false,
      };
    },
    // 设置列表数据
    setList(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  },
};
