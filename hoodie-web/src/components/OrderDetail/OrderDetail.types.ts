/**
 * @author duynguyen © 2025
 */
import type { OrderSearchDomainModel } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  orderSearchDomainModel: OrderSearchDomainModel;
  loading: boolean;
}