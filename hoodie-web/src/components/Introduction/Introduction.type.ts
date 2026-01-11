
// ==============================|| Introduction Type ||============================== //

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  // tradeTermsCustomerTypeEntryServiceModel?: {
  //   model?: {
  //     customerTypeInfoName?: string;
  //     sortKey?: number;
  //   };
  //   warningMessages?: { code: string; text: string }[];
  // };
  ribbonItem: any[];
}