/**
 * @author duynguyen © 2025
 */
import type { VoucherSubmitApplicationModel } from "../../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  voucherSubmitApplicationModel?: VoucherSubmitApplicationModel;
//   skillTypeAC?: SearchResponse<CodeSearchDomainModel>;
//   ageGroupAC?: SearchResponse<CodeSearchDomainModel>;
  loading: boolean;
  isSubmitting: boolean;
  requestType: string;
  // ribbonItem: any[];
}