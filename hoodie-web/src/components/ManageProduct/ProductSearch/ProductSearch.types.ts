/**
 * @author duynguyen © 2025
 */
import type { GridColDef, GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { ProductSearchApplicationModel, ProductSearchDomainModel, SearchResponse } from "../../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  productSearchApplicationModel?: ProductSearchApplicationModel;
  // categorySearchApplicationModel?: CategorySearchApplicationModel;
  productSearchDomainModel: SearchResponse<ProductSearchDomainModel>;
  pagination: any;
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  // categorySearchDomainModel: SearchResponse<CategorySearchDomainModel>;
  columns: GridColDef[];
  loading: boolean;
  // ribbonItem: any[];
}