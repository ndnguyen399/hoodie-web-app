/**
 * @author duynguyen © 2025
 */


export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
//   productSearchApplicationModel?: ProductSearchApplicationModel;
//   categorySearchApplicationModel?: CategorySearchApplicationModel;
//   productSearchDomainModel: SearchResponse<ProductSearchDomainModel>;
//   categorySearchDomainModel: SearchResponse<CategorySearchDomainModel>;
  loading: boolean;
  // ribbonItem: any[];
}