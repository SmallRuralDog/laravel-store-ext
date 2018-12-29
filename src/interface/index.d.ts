declare namespace Models {
  interface Goods {
    /**
     * 产品列表
     */
    list: GoodsListItem[];
  }

  interface GoodsListItem {
    name: string;
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
