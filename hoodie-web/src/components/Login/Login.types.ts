/**
 * @author duynguyen © 2025
 */

import type { LoginRequestApplicationModel } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  loginRequestApplicationModel: LoginRequestApplicationModel,
  loading: boolean;
}