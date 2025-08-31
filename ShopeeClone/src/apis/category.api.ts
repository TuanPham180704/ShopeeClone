import type { Category } from 'src/types/category.type'
import type { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/htpp'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponseApi<Category[]>>(URL)
  }
}


export default categoryApi