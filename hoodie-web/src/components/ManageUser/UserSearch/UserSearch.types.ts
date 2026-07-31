/**
 * @author duynguyen © 2025
 */
import type { GridColDef, GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import type { SearchResponse, UserSearchApplicationModel, UserSearchDomainModel } from "../../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  userSearchApplicationModel?: UserSearchApplicationModel;
  userSearchDomainModel: SearchResponse<UserSearchDomainModel>;
  pagination: any;
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  columns: GridColDef[];
  loading: boolean;
}