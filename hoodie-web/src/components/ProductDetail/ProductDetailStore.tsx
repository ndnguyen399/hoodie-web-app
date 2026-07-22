/**
 * @author duynguyen © 2025
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useApplicationContext } from "../../hooks/useApplicationContext";
import { useTranslation } from "../../hooks/useTranslation";
import type { PageProps, PageState } from "./ProductDetail.types";
import Constants from "../common/Constants";
import { ProductSubmitViewApi } from "../api/ProductSubmitViewApi";
import { useAppParameters } from "../../hooks/useAppParameters";
import { useNavigate } from "react-router-dom";
import { CartSubmitViewApi } from "../api/CartSubmitViewApi";

/**
 * useStore
 * 
 * @param props 
 * @returns useStore
 */
export const useStore = (props: PageProps) => {
    const { t } = useTranslation();
    const context = useApplicationContext();
    const params = useAppParameters();
    const navigate = useNavigate();

    const [state, setState] = useState<PageState>({
        productSubmitApplicationModel: {},
        // productSearchDomainModel: {},
        listImages: [],
        // images: [],
        selectedImageIndex: 0,
        loading: false,
    });

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const action = useMemo(() => ({
        load: async () => {
            await context.overlay.open().execute(async () => {
                try {
                    const response = await new ProductSubmitViewApi().initial({
                        requestType: Constants.REUEST_TYPE_DETAIL,
                        model: {
                            productId: Number(params.get("productId"))!
                        }
                    });
                    // const images = response.data?.search?.[0]?.listImages?.map((item: any) => ({
                    //     imageId: item.imageId,
                    //     imageUrl: item.imageUrl,
                    //     name:
                    //         item.altText ||
                    //         item.imageUrl?.split('/').pop() ||
                    //         '',
                    //     isNew: false
                    // })) || [];
                        
                    setState(prev => ({
                        ...prev,
                        listImages: response.data?.search[0]?.listImages,
                        productSubmitApplicationModel: response.data?.search?.[0],
                        selectedImageIndex: 0,
                        // images
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
                    navigate(-1)
                }
            });
        },
        selectImage: (index: number) => {
            setState(prev => ({ ...prev, selectedImageIndex: index }));
        },
        submitCart: {
            execute: (productId: number) => {
                context.overlay
                .open()
                .execute(async () => {
                    setState(prev => ({ ...prev, isSubmitting: true }));
                    try {
                        const result = await new CartSubmitViewApi().submit({
                            requestType: Constants.REUEST_TYPE_CREATE,
                            model: {
                                productId: productId,
                                quantity: 1
                            }
                        });
                        const resultModel = result.data;
                        let message = '';
                        for (const item of resultModel) {
                            message += `${item.code}: ${item.message}\n`;
                        }
                        await context.navigation.openInformationDialog(message);
                        // action.back.execute();
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
                            isSubmitting: false
                        }));
                    }
                });
            }
        },
    }), []);

    return {
        t,
        state,
        action
    };
};