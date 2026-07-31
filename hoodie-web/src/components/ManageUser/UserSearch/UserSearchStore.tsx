/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useApplicationContext } from "../../../hooks/useApplicationContext";
// import { useAppParameters } from "../../hooks/useAppParameters";
import { useTranslation } from "../../../hooks/useTranslation";
import type { PageProps, PageState } from "./UserSearch.types";
import Constants from "../../common/Constants";
import { GridActionsCellItem, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";
import BlockIcon from '@mui/icons-material/Block';
import type { ProductSearchDomainModel, UserSearchDomainModel } from "../../common/Models";
import { UserSearchViewApi } from "../../api/UserSearchViewApi";
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
        userSearchApplicationModel: {},
        userSearchDomainModel: {},
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
        handleRefreshClick: {
            execute: async () => {
                await action.grid.loadDataTable.execute();
            }
        },
        searchUser: {
            execute: async (
                paginationModel: GridPaginationModel, 
                sortModel: GridSortModel, 
                filterModel: GridFilterModel
            ): Promise<{ items: UserSearchDomainModel[]; itemCount: number }> => {
                const response = await new UserSearchViewApi().search(stateRef.current.userSearchApplicationModel!);
                const userData = response.data?.search!;

                let filteredProduct = [...userData];

                // Apply filters (example only)
                if (filterModel?.items?.length) {
                    filterModel.items.forEach(({ field, value, operator }) => {
                        if (!field || value == null) {
                            return;
                        }
                        filteredProduct = filteredProduct.filter((product) => {
                        const userValue = product[field as keyof UserSearchDomainModel];
            
                        switch (operator) {
                            case 'contains':
                                return String(userValue).toLowerCase().includes(String(value).toLowerCase());
                            case 'equals':
                                return userValue === value;
                            case 'startsWith':
                                return String(userValue).toLowerCase().startsWith(String(value).toLowerCase());
                            case 'endsWith':
                                return String(userValue).toLowerCase().endsWith(String(value).toLowerCase());
                            case '>':
                                return userValue > value;
                            case '<':
                                return userValue < value;
                            default:
                                return true;
                        }
                        });
                    });
                }

                // Apply sorting
                if (sortModel?.length) {
                    filteredProduct.sort((a, b) => {
                        for (const { field, sort } of sortModel) {
                        if (a[field as keyof UserSearchDomainModel] < b[field as keyof UserSearchDomainModel]) {
                            return sort === 'asc' ? -1 : 1;
                        }
                        if (a[field as keyof UserSearchDomainModel] > b[field as keyof UserSearchDomainModel]) {
                            return sort === 'asc' ? 1 : -1;
                        }
                        }
                        return 0;
                    });
                }

                // Apply pagination
                const start = paginationModel.page * paginationModel.pageSize;
                const end = start + paginationModel.pageSize;
                const paginatedUser = filteredProduct.slice(start, end);

                return {
                    items: paginatedUser,
                    itemCount: filteredProduct.length,
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
                                const listData = await action.searchUser.execute(
                                    stateRef.current.paginationModel,
                                    stateRef.current.sortModel,
                                    stateRef.current.filterModel,
                                );

                                setState(prev => ({
                                    ...prev,
                                    userSearchDomainModel: {
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
            onRowDelete: async (
                row: UserSearchDomainModel,
            ) => {
                const isOk = 
                    await context.navigation
                        .openConfirmDialog(`${t('label-textButtonDelete')} - ${t('label-fullName')}: ${row.fullName}`);
                if (!isOk) {
                    return;
                }

                try {
                    const result = await new UserSearchViewApi().block({
                        requestType: Constants.REUEST_TYPE_DELETE,
                        model: {
                            userId: row.userId,
                            email: row.email
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
            build: (): GridColDef<UserSearchDomainModel>[] => {
                return [
                    { 
                        field: 'userId', 
                        headerName: t('label-id'),
                        width: 70,
                    },
                    {
                        field: 'fullName',
                        headerName: t('label-fullName'),
                        width: 140,
                    },
                    { 
                        field: 'email', 
                        headerName: t('label-email'),
                        width: 70,
                    },
                    {
                        field: 'phone',
                        headerName: t('label-phone'),
                        width: 140,
                    },
                    {
                        field: 'birthDate',
                        headerName: t('label-birthDate'),
                        type: 'date',
                        valueGetter: value => value && new Date(value),
                        width: 140,
                    },
                    {
                        field: 'gender',
                        headerName: t('label-gender'),
                        width: 140,
                    },
                    {
                        field: 'note',
                        headerName: t('label-note'),
                        width: 180,
                    },
                    {
                        field: 'createdAt',
                        headerName: t('label-createdAt'),
                        type: 'date',
                        valueGetter: value => value && new Date(value),
                        width: 140,
                    },
                    {
                        field: 'updatedAt',
                        headerName: t('label-updatedAt'),
                        type: 'date',
                        valueGetter: value => value && new Date(value),
                        width: 140,
                    },
                    {
                        field: 'deleteFlag',
                        headerName: t('label-deleteFlag'),
                        type: 'boolean',
                    },
                    {
                        field: 'actions',
                        headerName: t('no-text'),
                        type: 'actions',
                        align: 'right',
                        width: 110,
                        getActions: ({ row }) => [
                            <GridActionsCellItem
                                key='delete-item'
                                icon={<BlockIcon sx={{color: 'red'}} />}
                                label='Block'
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