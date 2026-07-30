/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
import { useTranslation } from "../../../hooks/useTranslation";
import Constants from "../../common/Constants";
import { GridActionsCellItem, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { PageProps, PageState } from "./VoucherSearch.types";
import type { VoucherSearchDomainModel } from "../../common/Models";
import { VoucherSearchViewApi } from "../../api/VoucherSearchViewApi";
import { VoucherSubmitViewApi } from "../../api/VoucherSubmitViewApi";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();
    // const params = useAppParameters();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    const [state, setState] = useState<PageState>({
        voucherSearchApplicationModel: {},
        voucherSearchDomainModel: {},
        pagination: { paginationModel: { pageSize: Constants.INITIAL_PAGE_SIZE } },
        paginationModel: {
            page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
            pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : Constants.INITIAL_PAGE_SIZE
        },
        sortModel: searchParams.get('sort') ? JSON.parse(searchParams.get('sort') ?? '') : [],
        filterModel: searchParams.get('filter') ? JSON.parse(searchParams.get('filter') ?? '') : { items: [] },
        columns: [],
        loading: false
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                action.grid.loadDataTable.execute();

                setState(prev => ({
                    ...prev,
                    columns: action.columns.build()
                }));
            });
        },
        handleCreateClick: {
            execute: () => {
                navigate(`${Constants.routeVoucherRegistration}?requestType=${Constants.REUEST_TYPE_CREATE}`)
            }
        },
        handleRefreshClick: {
            execute: async () => {
                await action.grid.loadDataTable.execute();
            }
        },
        // handleRowClick: {
        //     execute: ({ row }): GridEventListener<'rowClick'> => {
        //         return null;
        //     }
        // },
        searchVoucher: {
            execute: async (
                paginationModel: GridPaginationModel, 
                sortModel: GridSortModel, 
                filterModel: GridFilterModel
            ): Promise<{ items: VoucherSearchDomainModel[]; itemCount: number }> => {
                const response = await new VoucherSearchViewApi().search(stateRef.current.voucherSearchApplicationModel!);
                const voucherData = response.data?.search!;

                let filteredVoucher = [...voucherData];

                // Apply filters (example only)
                if (filterModel?.items?.length) {
                    filterModel.items.forEach(({ field, value, operator }) => {
                        if (!field || value == null) {
                            return;
                        }
            
                        filteredVoucher = filteredVoucher.filter((category) => {
                        const categoryValue = category[field as keyof VoucherSearchDomainModel];
            
                        switch (operator) {
                            case 'contains':
                                return String(categoryValue).toLowerCase().includes(String(value).toLowerCase());
                            case 'equals':
                                return categoryValue === value;
                            case 'startsWith':
                                return String(categoryValue).toLowerCase().startsWith(String(value).toLowerCase());
                            case 'endsWith':
                                return String(categoryValue).toLowerCase().endsWith(String(value).toLowerCase());
                            case '>':
                                return categoryValue > value;
                            case '<':
                                return categoryValue < value;
                            default:
                                return true;
                        }
                        });
                    });

                }

                // Apply sorting
                if (sortModel?.length) {
                    filteredVoucher.sort((a, b) => {
                        for (const { field, sort } of sortModel) {
                        if (a[field as keyof VoucherSearchDomainModel] < b[field as keyof VoucherSearchDomainModel]) {
                            return sort === 'asc' ? -1 : 1;
                        }
                        if (a[field as keyof VoucherSearchDomainModel] > b[field as keyof VoucherSearchDomainModel]) {
                            return sort === 'asc' ? 1 : -1;
                        }
                        }
                        return 0;
                    });
                }

                // Apply pagination
                const start = paginationModel.page * paginationModel.pageSize;
                const end = start + paginationModel.pageSize;
                const paginatedCategory = filteredVoucher.slice(start, end);

                return {
                    items: paginatedCategory,
                    itemCount: filteredVoucher.length,
                };
            }
        },
        grid: {
            loadDataTable: {
                execute: async () => {
                    context.overlay
                        .open()
                        .execute(async () => {
                            setState(prev => ({ ...prev, loading: true }));
                            try {
                                const listData = await action.searchVoucher.execute(
                                    stateRef.current.paginationModel,
                                    stateRef.current.sortModel,
                                    stateRef.current.filterModel,
                                );

                                setState(prev => ({
                                    ...prev,
                                    voucherSearchDomainModel: {
                                        info: {
                                            total: listData.itemCount
                                        },
                                        search: listData.items
                                    }
                                }));
                            } catch (error: any) {
                                const responseData = error?.payload;
                                if (responseData) {
                                    let message = '';
                                    if (responseData.data?.length) {
                                        for (const item of responseData.data) {
                                            message += `${item.code}: ${item.message}\n`;
                                        }
                                    } else {
                                        message = responseData.message;
                                    }
                                    await context.navigation.openErrorDialog(message);
                                } else {
                                    await context.navigation.openErrorDialog(t("label-internalServerError"));
                                }
                            } finally {
                                setState(prev => ({
                                    ...prev,
                                    loading: false
                                }));
                            }
                        });
                }
            },
            onPaginationModelChange: async (
                model: GridPaginationModel,
            ) => {
                setState(prev => ({ ...prev, paginationModel: model }));

                searchParams.set('page', String(model.page));
                searchParams.set('pageSize', String(model.pageSize));

                const newSearchParamsString = searchParams.toString();
                navigate(
                    `${pathname}${newSearchParamsString ? `?${newSearchParamsString}` : ''}`
                );

                await action.grid.loadDataTable.execute();
            },
            onSortModelChange: async (
                model: GridSortModel,
            ) => {
                setState(prev => ({ 
                    ...prev, 
                    sortModel: model
                }));

                if (model.length > 0) {
                    searchParams.set('sort', JSON.stringify(model));
                } else {
                    searchParams.delete('sort');
                }

                const newSearchParamsString = searchParams.toString();
                navigate(
                    `${pathname}${newSearchParamsString ? `?${newSearchParamsString}` : ''}`
                );

                await action.grid.loadDataTable.execute();
            },
            onFilterModelChange: async (
                model: GridFilterModel,
            ) => {
                setState(prev => ({ 
                    ...prev, 
                    filterModel: model,
                    paginationModel: {
                        ...prev.paginationModel,
                        page: 0 
                    }
                }));

                if (
                    model.items.length > 0 ||
                    (model.quickFilterValues && model.quickFilterValues.length > 0)
                ) {
                    searchParams.set('filter', JSON.stringify(model));
                } else {
                    searchParams.delete('filter');
                }

                const newSearchParamsString = searchParams.toString();
                navigate(
                    `${pathname}${newSearchParamsString ? `?${newSearchParamsString}` : ''}`
                );

                await action.grid.loadDataTable.execute();
            },
            // onRowClick: (
            //     params: GridRowParams<CategorySearchDomainModel>,
            // ) => {
            //     navigate(`/employees/${params.row.categoryId}`);
            // },
            // onRowEdit: (
            //     row: VoucherSearchDomainModel,
            // ) => {
            //     const searchParams = new URLSearchParams({
            //         requestType: Constants.REUEST_TYPE_UPDATE,
            //         categoryId: String(row.promotionId),
            //     });
            //     navigate({
            //         pathname: Constants.routeCategoryRegistration,
            //         search: searchParams.toString()
            //     });
            // },
            onRowDelete: async (
                row: VoucherSearchDomainModel,
            ) => {
                const isOk = 
                    await context.navigation
                        .openConfirmDialog(`${t('label-textButtonDelete')} - ${t('label-promotionCode')}: ${row.promotionCode}`);
                if (!isOk) {
                    return;
                }

                try {
                    const result = await new VoucherSubmitViewApi().submitDelete({
                        requestType: Constants.REUEST_TYPE_DELETE,
                        model: {
                            promotionId: row.promotionId
                        }
                    });
                    const resultModel = result.data;
                    let message = '';
                    for (const item of resultModel) {
                        message += `${item.code}: ${item.message}\n`;
                    }
                    await context.navigation.openInformationDialog(message);
                    await action.grid.loadDataTable.execute();
                } catch (error: any) {
                    const responseData = error?.payload;
                    if (responseData) {
                        let message = '';
                        if (responseData.data?.length) {
                            for (const item of responseData.data) {
                                message += `${item.code}: ${item.message}\n`;
                            }
                        } else {
                            message = responseData.message;
                        }
                        await context.navigation.openErrorDialog(message);
                    } else {
                        await context.navigation.openErrorDialog(t("label-internalServerError"));
                    }
                }
            },
        },
        columns: {
            build: (): GridColDef<VoucherSearchDomainModel>[] => {
                return [
                    {
                        field: 'actions',
                        type: 'actions',
                        // flex: 1,
                        align: 'right',
                        width: 110,
                        getActions: ({ row }) => [
                            // <GridActionsCellItem
                            //     key='edit-item'
                            //     icon={<EditIcon sx={{color: 'orange'}} />}
                            //     label='Edit'
                            //     onClick={() => action.grid.onRowEdit(row)}
                            // />,
                            <GridActionsCellItem
                                key='delete-item'
                                icon={<DeleteIcon sx={{color: 'red'}} />}
                                label='Delete'
                                onClick={() => action.grid.onRowDelete(row)}
                            />
                        ]
                    },
                    { 
                        field: 'promotionId', 
                        headerName: t('label-id'), 
                    },
                    {
                        field: 'promotionCode',
                        headerName: t('label-promotionCode'),
                        width: 140,
                    },
                    {
                        field: 'promotionName',
                        headerName: t('label-promotionName'),
                        width: 140,
                    },
                    {
                        field: 'description',
                        headerName: t('label-promotionDescription'),
                        width: 140,
                    },
                    {
                        field: 'discountValue',
                        headerName: t('label-discountValue'),
                        type: 'number',
                        width: 140,
                    },
                    {
                        field: 'minOrderValue',
                        headerName: t('label-minOrderValue'),
                        type: 'number',
                        width: 140,
                    },
                    {
                        field: 'maxDiscountAmount',
                        headerName: t('label-maxDiscountAmount'),
                        type: 'number',
                        width: 240,
                    },
                    {
                        field: 'usageLimit',
                        headerName: t('label-usageLimit'),
                        type: 'number',
                        width: 240,
                    },
                    {
                        field: 'startDate',
                        headerName: t('label-startDate'),
                        type: 'date',
                        valueGetter: value => value && new Date(value),
                        width: 240,
                    },
                    {
                        field: 'endDate',
                        headerName: t('label-endDate'),
                        type: 'date',
                        valueGetter: value => value && new Date(value),
                        width: 240,
                    },
                    {
                        field: 'isActive',
                        headerName: t('label-isActive'),
                        width: 240,
                        type: 'boolean',
                    },
                    // {
                    //     field: 'createdAt',
                    //     headerName: t('label-createdAt'),
                    //     type: 'date',
                    //     valueGetter: value => value && new Date(value),
                    //     width: 140,
                    // },
                    // {
                    //     field: 'updatedAt',
                    //     headerName: t('label-updatedAt'),
                    //     type: 'date',
                    //     valueGetter: value => value && new Date(value),
                    //     width: 140,
                    // },
                    // {
                    //     field: 'deleteFlag',
                    //     headerName: t('label-deleteFlag'),
                    //     type: 'boolean',
                    // }
                ];
            }
        }
    }), []);

    return {
        t,
        state,
        action
    };
};