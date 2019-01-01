import request from '@/utils/request';


export async function getList() {
  return request('/api/goodsList');
}
export async function getSkus() {
  return request('/api/skus');
}