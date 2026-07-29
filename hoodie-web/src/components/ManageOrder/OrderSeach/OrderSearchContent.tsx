/**
 * @author duynguyen © 2025
 */
import React, { useEffect } from "react";
import { Box, Button, CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import {
  DataGrid,
  gridClasses
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { PageProps } from "./OrderSearch.types";
import { useStore } from "./OrderSearchStore";
import PageContainer from "../PageContainer";
import Constants from "../../common/Constants";

/**
 * OrderSearchContent
 * 
 * @param props 
 * @returns OrderSearchContent
 */
export const OrderSearchContent: React.FC<PageProps> = props => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <CircularProgress />
    }

    return (
        <>
            <PageContainer
              title={t('label-pageTitleOrderSearch')}
              breadcrumbs={[{ title: t('label-pageTitleOrderSearch') }]}
              actions={
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Tooltip title="Reload data" placement="right" enterDelay={1000}>
                        <div>
                            <IconButton 
                                size="small" 
                                aria-label="refresh" 
                                onClick={action.handleRefreshClick.execute}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                  </Stack>
              }
            >
              <Box sx={{ flex: 1, width: '100%' }}>
                  <DataGrid
                      getRowId={(row) => row.orderId}
                      rows={state.orderSearchDomainModel?.search}
                      rowCount={state.orderSearchDomainModel.info?.total}
                      columns={state.columns}
                      pagination
                      sortingMode="server"
                      filterMode="server"
                      paginationMode="server"
                      paginationModel={state.paginationModel}
                      onPaginationModelChange={action.grid.onPaginationModelChange}
                      sortModel={state.sortModel}
                      onSortModelChange={action.grid.onSortModelChange}
                      filterModel={state.filterModel}
                      onFilterModelChange={action.grid.onFilterModelChange}
                      disableRowSelectionOnClick
                      // onRowClick={handleRowClick}
                      loading={state.loading}
                      initialState={state.pagination}
                      showToolbar
                      pageSizeOptions={[5, Constants.INITIAL_PAGE_SIZE, 25]}
                      sx={{
                      [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                          outline: 'transparent',
                      },
                      [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                          {
                          outline: 'none',
                          },
                      [`& .${gridClasses.row}:hover`]: {
                          cursor: 'pointer',
                      },
                      }}
                      slotProps={{
                        loadingOverlay: {
                            variant: 'circular-progress',
                            noRowsVariant: 'circular-progress',
                        },
                        baseIconButton: {
                            size: 'small',
                        },
                      }}
                  />
              </Box>
            </PageContainer>
        </>
    );
};