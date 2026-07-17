/**
 * @author duynguyen © 2025
 */
import type { CheckoutInitialDomainModel, CheckoutSubmitApplicationModel, SearchResponse } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  checkoutSubmitApplicationModel?: CheckoutSubmitApplicationModel;
  checkoutInitialDomainModel: SearchResponse<CheckoutInitialDomainModel>;
  selectedItems: []; // Danh sách productId được chọn
  totalAmount: number; // Tổng tiền tất cả
  shippingAmount: number; // Tổng tiền các item được chọn
//   selectAll: boolean;
  isSubmitting: boolean;
  loading: boolean;
}