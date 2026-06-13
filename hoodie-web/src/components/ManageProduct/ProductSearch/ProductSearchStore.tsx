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
import { GridActionsCellItem, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ProductSearchDomainModel } from "../../common/Models";
import { ProductSearchViewApi } from "../../api/ProductSearchViewApi";
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
        productSearchApplicationModel: {},
        productSearchDomainModel: {},
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
        searchProduct: {
            execute: async (
                paginationModel: GridPaginationModel, 
                sortModel: GridSortModel, 
                filterModel: GridFilterModel
            ): Promise<{ items: ProductSearchDomainModel[]; itemCount: number }> => {
                const response = await new ProductSearchViewApi().search(stateRef.current.productSearchApplicationModel!);
                const productData = response.data?.search!;

                let filteredProduct = [...productData];

                // Apply filters (example only)
                if (filterModel?.items?.length) {
                    filterModel.items.forEach(({ field, value, operator }) => {
                        if (!field || value == null) {
                            return;
                        }
                        filteredProduct = filteredProduct.filter((product) => {
                        const categoryValue = product[field as keyof ProductSearchDomainModel];
            
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
                    filteredProduct.sort((a, b) => {
                        for (const { field, sort } of sortModel) {
                        if (a[field as keyof ProductSearchDomainModel] < b[field as keyof ProductSearchDomainModel]) {
                            return sort === 'asc' ? -1 : 1;
                        }
                        if (a[field as keyof ProductSearchDomainModel] > b[field as keyof ProductSearchDomainModel]) {
                            return sort === 'asc' ? 1 : -1;
                        }
                        }
                        return 0;
                    });
                }

                // Apply pagination
                const start = paginationModel.page * paginationModel.pageSize;
                const end = start + paginationModel.pageSize;
                const paginatedProduct = filteredProduct.slice(start, end);

                return {
                    items: paginatedProduct,
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
                                const listData = await action.searchProduct.execute(
                                    stateRef.current.paginationModel,
                                    stateRef.current.sortModel,
                                    stateRef.current.filterModel,
                                );

                                setState(prev => ({
                                    ...prev,
                                    productSearchDomainModel: {
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
            onRowEdit: (
                row: ProductSearchDomainModel,
            ) => {
                const searchParams = new URLSearchParams({
                    requestType: Constants.REUEST_TYPE_UPDATE,
                    productId: String(row.productId),
                });
                navigate({
                    pathname: Constants.routeProductRegistration,
                    search: searchParams.toString()
                });
            },
            onRowDelete: async (
                row: ProductSearchDomainModel,
            ) => {
                const isOk = 
                    await context.navigation
                        .openConfirmDialog(`${t('label-textButtonDelete')} - ${t('label-categoryName')}: ${row.productName}`);
                if (!isOk) {
                    return;
                }

                try {
                    // const result = await new CategorySubmitViewApi().submitDelete({
                    //     requestType: Constants.REUEST_TYPE_DELETE,
                    //     model: {
                    //         categoryId: row.categoryId
                    //     }
                    // });
                    // const resultModel = result.data;
                    // let message = '';
                    // for (const item of resultModel) {
                    //     message += `${item.code}: ${item.message}\n`;
                    // }
                    // await context.navigation.openInformationDialog(message);
                    // await action.grid.loadDataTable.execute();
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
            build: (): GridColDef<ProductSearchDomainModel>[] => {
                return [
                    {
                        field: 'actions',
                        headerName: t('no-text'),
                        type: 'actions',
                        align: 'right',
                        width: 110,
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
                    },
                    { 
                        field: 'productId', 
                        headerName: t('label-id'),
                        width: 70,
                    },
                    {
                        field: 'productName',
                        headerName: t('label-productName'),
                        width: 140,
                    },
                    { 
                        field: 'categoryId', 
                        headerName: t('label-categoryId'),
                        width: 70,
                    },
                    {
                        field: 'categoryName',
                        headerName: t('label-categoryName'),
                        width: 140,
                    },
                    {
                        field: 'productDescription',
                        headerName: t('label-productDescription'),
                        width: 240,
                    },
                    {
                        field: 'price',
                        headerName: t('label-price'),
                        type: 'number',
                        width: 140,
                        headerAlign: 'center'
                    },
                    {
                        field: 'stockQuantity',
                        headerName: t('label-stockQuantity'),
                        type: 'number',
                        width: 180,
                        headerAlign: 'center'
                    },
                    {
                        field: 'skillLogic',
                        headerName: t('label-skillLogic'),
                        width: 140,
                    },
                    {
                        field: 'skillLogicName',
                        headerName: t('label-skillLogicName'),
                        width: 180,
                    },
                    {
                        field: 'skillCreative',
                        headerName: t('label-skillCreative'),
                        width: 140,
                    },
                    {
                        field: 'skillCreativeName',
                        headerName: t('label-skillCreativeName'),
                        width: 180,
                    },
                    {
                        field: 'skillStem',
                        headerName: t('label-skillStem'),
                        width: 140,
                    },
                    {
                        field: 'skillStemName',
                        headerName: t('label-skillStemName'),
                        width: 180,
                    },
                    {
                        field: 'skillMotor',
                        headerName: t('label-skillMotor'),
                        width: 140,
                    },
                    {
                        field: 'skillMotorName',
                        headerName: t('label-skillMotorName'),
                        width: 180,
                    },
                    {
                        field: 'skillSocial',
                        headerName: t('label-skillSocial'),
                        width: 140,
                    },
                    {
                        field: 'skillSocialName',
                        headerName: t('label-skillSocialName'),
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