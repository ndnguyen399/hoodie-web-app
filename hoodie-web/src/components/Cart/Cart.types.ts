/**
 * @author duynguyen © 2025
 */
import type { CartSearchApplicationModel, CartSearchDomainModel, SearchResponse } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  cartSearchApplicationModel?: CartSearchApplicationModel;
  cartSearchDomainModel: SearchResponse<CartSearchDomainModel>;
  selectedItems: (string | number)[]; // Danh sách productId được chọn
  totalAmount: number; // Tổng tiền tất cả
  selectedAmount: number; // Tổng tiền các item được chọn
  loading: boolean;
}