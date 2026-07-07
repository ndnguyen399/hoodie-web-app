/**
 * @author duynguyen © 2025
 */
import type { CategorySearchApplicationModel, CategorySearchDomainModel, ProductSearchApplicationModel, ProductSearchDomainModel, SearchResponse } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  productSearchApplicationModel?: ProductSearchApplicationModel;
  categorySearchApplicationModel?: CategorySearchApplicationModel;
  productSearchDomainModel: SearchResponse<ProductSearchDomainModel>;
  categorySearchDomainModel: SearchResponse<CategorySearchDomainModel>;
  loading: boolean;
  isSubmitting: boolean;
  // Dữ liệu dùng cho lọc local
  allProducts: ProductSearchDomainModel[];           // Danh sách gốc
  filteredProducts: ProductSearchDomainModel[];      // Danh sách đã lọc
  // Trạng thái filter hiện tại
  filters: ProductSearchFilters;
}

// ==================== TYPES CHO FILTER ====================
export interface ProductSearchFilters {
    minPrice: number;
    maxPrice: number;
    selectedCategoryIds: number[];
    searchText: string;
}