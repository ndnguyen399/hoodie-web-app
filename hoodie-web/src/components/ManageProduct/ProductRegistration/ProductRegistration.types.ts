/**
 * @author duynguyen © 2025
 */
import type { ProductSubmitApplicationModel, CategorySearchDomainModel, CodeSearchDomainModel, SearchResponse } from "../../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  productSubmitApplicationModel?: ProductSubmitApplicationModel;
  // images?: File[];
  images?: ProductImageViewModel[];
  skillLogicAC?: SearchResponse<CodeSearchDomainModel>;
  skillCreativeAC?: SearchResponse<CodeSearchDomainModel>;
  skillStemAC?: SearchResponse<CodeSearchDomainModel>;
  skillMotorAC?: SearchResponse<CodeSearchDomainModel>;
  skillSocialAC?: SearchResponse<CodeSearchDomainModel>;
  categoryAC?: SearchResponse<CategorySearchDomainModel>;
  loading: boolean;
  isSubmitting: boolean;
  requestType: string;
  // ribbonItem: any[];
}

export interface ProductImageViewModel {
    imageId?: number;
    imageUrl?: string;
    file?: File;
    name: string;
    isNew: boolean;
}