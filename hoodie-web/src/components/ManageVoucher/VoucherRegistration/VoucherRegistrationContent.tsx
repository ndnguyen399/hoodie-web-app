/**
 * @author duynguyen © 2025
 */
import React, { useEffect } from "react";
import { Autocomplete, Box, Button, CircularProgress, FormGroup, FormLabel, Grid, Stack, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { PageProps } from "./VoucherRegistration.types";
import { useStore } from "./VoucherRegistrationStore";
import PageContainer from "../PageContainer";
import Constants from "../../common/Constants";

/**
 * VoucherRegistrationContent
 * 
 * @param props 
 * @returns VoucherRegistrationContent
 */
export const VoucherRegistrationContent: React.FC<PageProps> = props => {
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
                title={state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-pageTitleVoucherCreate') : t('label-pageTitleVoucherUpdate')}
                breadcrumbs={[{ title: t('label-pageTitleVoucherSearch'), path: Constants.routeVoucherSearch }, { title: state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-buttonCreate') : t('label-buttonUpdate') }]}
            >
            <Box
                component="form"
                onSubmit={action.submitVoucher.execute}
                noValidate
                autoComplete="off"
                // onReset={action.reset.execute}
                sx={{ width: '100%' }}
            >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'none' }}>
                        <TextField
                            name="promotionId"
                            label={t('label-promotionId')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
                            }} 
                            value={state.voucherSubmitApplicationModel?.promotionId!}
                            onChange={(e) => {
                                action.onChangeField("promotionId", e.target.value);
                            }}
                            fullWidth
                            type="hidden"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="promotionCode"
                            label={t('label-promotionCode')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
                                inputLabel: {
                                    shrink: state.voucherSubmitApplicationModel?.promotionCode ? true : false
                                }
                            }} 
                            value={state.voucherSubmitApplicationModel?.promotionCode!}
                            onChange={(e) => {
                                action.onChangeField("promotionCode", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="promotionName"
                            label={t('label-promotionName')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.voucherSubmitApplicationModel?.promotionName ? true : false
                                }
                            }} 
                            value={state.voucherSubmitApplicationModel?.promotionName!}
                            onChange={(e) => {
                                action.onChangeField("promotionName", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="promotionDescription"
                            label={t('label-promotionDescription')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.voucherSubmitApplicationModel?.description ? true : false
                                }
                            }} 
                            value={state.voucherSubmitApplicationModel?.description!}
                            onChange={(e) => {
                                action.onChangeField("description", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="discountValue"
                            label={t('label-discountValue')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.voucherSubmitApplicationModel?.discountValue ? true : false
                                }
                            }} 
                            value={state.voucherSubmitApplicationModel?.discountValue!}
                            onChange={(e) => {
                                action.onChangeField("discountValue", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="minOrderValue"
                            label={t('label-minOrderValue')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.voucherSubmitApplicationModel?.minOrderValue ? true : false
                                }
                            }} 
                            value={state.voucherSubmitApplicationModel?.minOrderValue!}
                            onChange={(e) => {
                                action.onChangeField("minOrderValue", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="maxDiscountAmount"
                            label={t('label-maxDiscountAmount')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.voucherSubmitApplicationModel?.maxDiscountAmount ? true : false
                                }
                            }} 
                            value={state.voucherSubmitApplicationModel?.maxDiscountAmount!}
                            onChange={(e) => {
                                action.onChangeField("maxDiscountAmount", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormLabel>{t("label-startDate")}</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="startDate"
                            name="startDate"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={state.voucherSubmitApplicationModel?.startDate|| ""}
                            onChange={(e) => {
                                action.onChangeField("startDate", e.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormLabel>{t("label-endDate")}</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="endDate"
                            name="endDate"
                            type="date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={state.voucherSubmitApplicationModel?.endDate|| ""}
                            onChange={(e) => {
                                action.onChangeField("endDate", e.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
            </FormGroup>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={action.back.execute}
                >
                    {t('label-buttonBack')}
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={state.isSubmitting}
                >
                    {state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-buttonCreate') : t('label-buttonUpdate')}
                </Button>
            </Stack>
            </Box>
            </PageContainer>
        </>
    );
};