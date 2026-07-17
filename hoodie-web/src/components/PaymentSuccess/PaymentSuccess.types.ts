/**
 * @author duynguyen © 2025
 */
import type { SearchResponse } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
//   categorySearchApplicationModel?: CategorySearchApplicationModel;
//   productSearchDomainModel: SearchResponse<ProductSearchDomainModel>;
  loading: boolean;
}