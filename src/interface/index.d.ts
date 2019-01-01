
declare namespace Models {
  interface Goods {
    /**
     * 产品列表
     */
    list: GoodsListItem[];
    skus: ISku[]
  }

  interface ISku {
    id: number;
    text: string;
    values: ISkuValues[]
  }
  interface ISkuValues {
    id: number;
    text: string
  }

  interface GoodsListItem {
    title: string;
    image_url: string;
    created_time: string;
    price: string;
    item_id: string;
    url: string;
    alias: string;
    stock_num: string;
    sold_num: number;
    visit_count_uv: number;
    visit_count_pv: number;
    is_used: number;
  }

  interface ISkuItem {
    id: number;
    name: string;
    image: MediaListItem;
    defaultOpen: boolean;
  }

  interface IGroupItem {
    id: number;
    name: string;
    is_image: boolean;
    defaultOpen: boolean;
    sku_list: ISkuItem[]
  }


  interface Media {
    /**
     * 是否显示弹窗
     */
    visible: boolean;
    /**
     * 最大选择数量
     */
    max: number;
    /**
     * 已选择列表
     */
    selected:MediaListItem[];
    /**
     * 选择回调
     */
    callBack: (res: MediaListItem[]) => void;
    /**
     * 媒体列表数据
     */
    list: MediaListItem[]
  }

  interface MediaListItem {
    id: string;
    name: string;
    thumb: string;
  }

}

declare namespace Functions {
  type dispatch = (object: { type: string, payload?: object }) => void
}