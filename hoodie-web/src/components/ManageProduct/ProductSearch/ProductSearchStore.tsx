/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
// import { useAppParameters } from "../../hooks/useAppParameters";
import { useTranslation } from "../../../hooks/useTranslation";
import type { PageProps, PageState } from "./ProductSearch.types";
import Constants from "../../common/Constants";
import { GridActionsCellItem, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridRowParams, type GridSortModel } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CategorySearchDomainModel } from "../../common/Models";
// import { CategorySearchViewApi } from "../../api/CategorySearchViewApi";
import { CategorySubmitViewApi } from "../../api/CategorySubmitViewApi";
// import type { ICommandBarItemProps } from "@fluentui/react";

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
        // categorySearchApplicationModel: {},
        // categorySearchDomainModel: {},
        pagination: { paginationModel: { pageSize: Constants.INITIAL_PAGE_SIZE } },
        paginationModel: {
            page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
            pageSize: searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : Constants.INITIAL_PAGE_SIZE
        },
        sortModel: searchParams.get('sort') ? JSON.parse(searchParams.get('sort') ?? '') : [],
        filterModel: searchParams.get('filter') ? JSON.parse(searchParams.get('filter') ?? '') : { items: [] },
        columns: [],
        loading: false
        // ribbonItem: []
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
                    // ribbonItem: action.getRibbonItem()
                }));
            });
        },
        handleCreateClick: {
            execute: () => {
                navigate(`${Constants.routeProductRegistration}?requestType=${Constants.REUEST_TYPE_CREATE}`)
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
        // searchCategory: {
        //     execute: async (
        //         paginationModel: GridPaginationModel, 
        //         sortModel: GridSortModel, 
        //         filterModel: GridFilterModel
        //     ): Promise<{ items: CategorySearchDomainModel[]; itemCount: number }> => {
        //         const response = await new CategorySearchViewApi().search(stateRef.current.categorySearchApplicationModel!);
        //         const categoryData = response.data?.search!;

        //         let filteredCategory = [...categoryData];

        //         // Apply filters (example only)
        //         if (filterModel?.items?.length) {
        //             filterModel.items.forEach(({ field, value, operator }) => {
        //                 if (!field || value == null) {
        //                     return;
        //                 }
            
        //                 filteredCategory = filteredCategory.filter((category) => {
        //                 const categoryValue = category[field as keyof CategorySearchDomainModel];
            
        //                 switch (operator) {
        //                     case 'contains':
        //                         return String(categoryValue).toLowerCase().includes(String(value).toLowerCase());
        //                     case 'equals':
        //                         return categoryValue === value;
        //                     case 'startsWith':
        //                         return String(categoryValue).toLowerCase().startsWith(String(value).toLowerCase());
        //                     case 'endsWith':
        //                         return String(categoryValue).toLowerCase().endsWith(String(value).toLowerCase());
        //                     case '>':
        //                         return categoryValue > value;
        //                     case '<':
        //                         return categoryValue < value;
        //                     default:
        //                         return true;
        //                 }
        //                 });
        //             });

        //         }

        //         // Apply sorting
        //         if (sortModel?.length) {
        //             filteredCategory.sort((a, b) => {
        //                 for (const { field, sort } of sortModel) {
        //                 if (a[field as keyof CategorySearchDomainModel] < b[field as keyof CategorySearchDomainModel]) {
        //                     return sort === 'asc' ? -1 : 1;
        //                 }
        //                 if (a[field as keyof CategorySearchDomainModel] > b[field as keyof CategorySearchDomainModel]) {
        //                     return sort === 'asc' ? 1 : -1;
        //                 }
        //                 }
        //                 return 0;
        //             });
        //         }

        //         // Apply pagination
        //         const start = paginationModel.page * paginationModel.pageSize;
        //         const end = start + paginationModel.pageSize;
        //         const paginatedCategory = filteredCategory.slice(start, end);

        //         return {
        //             items: paginatedCategory,
        //             itemCount: filteredCategory.length,
        //         };
        //     }
        // },
        grid: {
            loadDataTable: {
                execute: async () => {
                    context.overlay
                        .open()
                        .execute(async () => {
                            setState(prev => ({ ...prev, loading: true }));
                            try {
                                // const listData = await action.searchCategory.execute(
                                //     stateRef.current.paginationModel,
                                //     stateRef.current.sortModel,
                                //     stateRef.current.filterModel,
                                // );

                                setState(prev => ({
                                    ...prev,
                                    // categorySearchDomainModel: {
                                    //     info: {
                                    //         total: listData.itemCount
                                    //     },
                                    //     search: listData.items
                                    // }
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
                // setPaginationModel(model);

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
            onRowEdit: (
                row: CategorySearchDomainModel,
            ) => {
                const searchParams = new URLSearchParams({
                    requestType: Constants.REUEST_TYPE_UPDATE,
                    categoryId: String(row.categoryId),
                });
                navigate({
                    pathname: Constants.routeProductRegistration,
                    search: searchParams.toString()
                });
            },
            onRowDelete: async (
                row: CategorySearchDomainModel,
            ) => {
                const isOk = 
                    await context.navigation
                        .openConfirmDialog(`${t('label-textButtonDelete')} - ${t('label-categoryName')}: ${row.categoryName}`);
                if (!isOk) {
                    return;
                }

                try {
                    const result = await new CategorySubmitViewApi().submitDelete({
                        requestType: Constants.REUEST_TYPE_DELETE,
                        model: {
                            categoryId: row.categoryId
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
            build: (): GridColDef<CategorySearchDomainModel>[] => {
                return [
                    { field: 'productId', headerName: 'ID' },
                    {
                        field: 'categoryName',
                        headerName: t('label-categoryName'),
                        width: 140,
                    },
                    {
                        field: 'skillType',
                        headerName: t('label-skillType'),
                        width: 140,
                    },
                    {
                        field: 'skillTypeName',
                        headerName: t('label-skillTypeName'),
                        width: 140,
                    },
                    {
                        field: 'ageGroup',
                        headerName: t('label-ageGroup'),
                        width: 140,
                    },
                    {
                        field: 'ageGroupName',
                        headerName: t('label-ageGroupName'),
                        width: 140,
                    },
                    {
                        field: 'categoryDescription',
                        headerName: t('label-categoryDescription'),
                        width: 240,
                        // type: 'number',
                    },
                    // {
                    //     field: 'joinDate',
                    //     headerName: 'Join date',
                    //     type: 'date',
                    //     valueGetter: value =>
                    //     value && new Date(value),
                    //     width: 140,
                    // },
                    // {
                    //     field: 'role',
                    //     headerName: 'Department',
                    //     type: 'singleSelect',
                    //     valueOptions: [
                    //     'Market',
                    //     'Finance',
                    //     'Development'
                    //     ],
                    //     width: 160,
                    // },
                    // {
                    //     field: 'isFullTime',
                    //     headerName: 'Full-time',
                    //     type: 'boolean',
                    // },
                    {
                        field: 'actions',
                        type: 'actions',
                        flex: 1,
                        align: 'right',
                        getActions: ({ row }) => [
                            <GridActionsCellItem
                                key='edit-item'
                                icon={<EditIcon sx={{color: 'orange'}} />}
                                label='Edit'
                                onClick={() => action.grid.onRowEdit(row)}
                            />,
                            <GridActionsCellItem
                                key='delete-item'
                                icon={<DeleteIcon sx={{color: 'red'}} />}
                                label='Delete'
                                onClick={() => action.grid.onRowDelete(row)}
                            />
                        ]
                    }
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