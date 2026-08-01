/**
 * @author duynguyen © 2025
 */
import type { RevenueSearchDomainModel } from "../../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  loading: boolean;
  dateRange: '7days' | '30days' | '90days' | 'year';
  revenueSearchDomainModel?: RevenueSearchDomainModel;
}