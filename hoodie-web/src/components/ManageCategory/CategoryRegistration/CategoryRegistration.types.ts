/**
 * @author duynguyen © 2025
 */
import type { CategorySubmitApplicationModel, CodeSearchDomainModel, SearchResponse } from "../../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  categorySubmitApplicationModel?: CategorySubmitApplicationModel;
  skillTypeAC?: SearchResponse<CodeSearchDomainModel>;
  ageGroupAC?: SearchResponse<CodeSearchDomainModel>;
  loading: boolean;
  isSubmitting: boolean;
  requestType: string;
  // ribbonItem: any[];
}