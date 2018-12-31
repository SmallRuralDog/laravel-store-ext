
declare namespace Models {
  interface Goods {
    /**
     * 产品列表
     */
    list: GoodsListItem[];
  }

  interface GoodsListItem {
    title: string;
    image_url: string;
    created_time: string;
    price: string;
    item_id: string;
    url: string;
    alias: string;
    stock_num:string;
    sold_num:number;
    visit_count_uv:number;
    visit_count_pv:number;
    is_used:number;
  }


  interface Media {
    visible: boolean;
    callBack: (res: MediaListItem[]) => void;
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