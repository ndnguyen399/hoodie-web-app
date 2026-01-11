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
  // ribbonItem: any[];
}