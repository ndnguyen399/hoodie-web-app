/**
 * @author duynguyen © 2025
 */
import type { ProductImageSearchDomainModel, ProductSubmitApplicationModel } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  productSubmitApplicationModel?: ProductSubmitApplicationModel;
  // images?: ProductImageViewModel[];
  // productSearchDomainModel: SearchResponse<ProductSearchDomainModel>;
  listImages: ProductImageSearchDomainModel[];
  selectedImageIndex: number;
  loading: boolean;
} 