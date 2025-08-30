import type { Product, ProductList, ProductListConfig } from "src/types/product.type"
import type { SuccessResponseApi } from "src/types/utils.type"
import http from "src/utils/htpp"


const URL ='products'
const productApi = {
  getProducts(params : ProductListConfig){
    return http.get<SuccessResponseApi<ProductList>>(URL,{
      params
    })
  },
  getProductDetail(id:string){
    return http.get<SuccessResponseApi<Product>>(`${URL}/${id}`)
  }
}

export default productApi