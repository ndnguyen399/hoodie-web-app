/**
 * @author duynguyen © 2025
 */
import React, { useEffect } from "react";
import { Autocomplete, Box, Button, CircularProgress, FormControl, FormGroup, Grid, Stack, styled, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { CommandBar } from "@fluentui/react";
import type { PageProps } from "./ProductRegistration.types";
import { useStore } from "./ProductRegistrationStore";
import PageContainer from "../PageContainer";
import Constants from "../../common/Constants";
// import Image from "../../templates/Image";

/**
 * ProductRegistrationContent
 * 
 * @param props 
 * @returns ProductRegistrationContent
 */
export const ProductRegistrationContent: React.FC<PageProps> = props => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <CircularProgress />
    }

    return (
        <>
            {/* <CommandBar items={state.ribbonItem} /> */}
            <PageContainer
                title={state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-pageTitleProductCreate') : t('label-pageTitleProductUpdate')}
                breadcrumbs={[{ title: t('label-pageTitleProductSearch'), path: Constants.routeCategorySearch }, { title: state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-buttonCreate') : t('label-buttonUpdate') }]}
            >
            <Box
                component="form"
                onSubmit={action.submitProduct.execute}
                noValidate
                autoComplete="off"
                // onReset={action.reset.execute}
                sx={{ width: '100%' }}
            >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'none' }}>
                        <TextField
                            name="productId"
                            label={t('label-productId')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
                            }} 
                            value={state.productSubmitApplicationModel?.productId?? ''}
                            onChange={(e) => {
                                action.onChangeField("productId", e.target.value);
                            }}
                            fullWidth
                            type="hidden"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="productName"
                            label={t('label-productName')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
                                inputLabel: {
                                    shrink: state.productSubmitApplicationModel?.productName ? true : false
                                }
                            }} 
                            value={state.productSubmitApplicationModel?.productName?? ''}
                            onChange={(e) => {
                                action.onChangeField("productName", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.categoryAC?.search ?? []}
                                value={
                                    state.categoryAC?.search?.find(
                                        item =>
                                            item.categoryId ===
                                            state.productSubmitApplicationModel?.categoryId
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.categoryName ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.categoryId}>
                                    {option.categoryName}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.categoryId === value.categoryId
                                }
                                onOpen={action.items.category.handleOpen}
                                onChange={action.items.category.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-categoryName')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="productDescription"
                            label={t('label-productDescription')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.productSubmitApplicationModel?.productDescription ? true : false
                                }
                            }} 
                            value={state.productSubmitApplicationModel?.productDescription?? ''}
                            onChange={(e) => {
                                action.onChangeField("productDescription", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="price"
                            label={t('label-price')}
                            slotProps={{
                                htmlInput: {
                                    inputMode: "decimal",
                                    pattern: "^\\d{0,13}(\\.\\d{0,2})?$"
                                },
                                inputLabel: {
                                    shrink: !!state.productSubmitApplicationModel?.price
                                }
                            }} 
                            value={state.productSubmitApplicationModel?.price?? ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                const regex = /^\d{0,13}(\.\d{0,2})?$/;
                                if (val === "" || regex.test(val)) {
                                    action.onChangeField("price", val);
                                }
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="stockQuantity"
                            label={t('label-stockQuantity')}
                            slotProps={{
                                htmlInput: {
                                    inputMode: "numeric",
                                    pattern: "^\\d*$"
                                },
                                inputLabel: {
                                    shrink: state.productSubmitApplicationModel?.stockQuantity != null
                                }
                            }}
                            value={state.productSubmitApplicationModel?.stockQuantity?? ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                const regex = /^\d*$/;
                                if (val === "" || regex.test(val)) {
                                    action.onChangeField("stockQuantity", val === "" ? null : Number(val));
                                }
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.skillLogicAC?.search ?? []}
                                value={
                                    state.skillLogicAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.productSubmitApplicationModel?.skillLogic
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue} {t('label-point')}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.skillLogic.handleOpen}
                                onChange={action.items.skillLogic.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-skillLogic')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.skillCreativeAC?.search ?? []}
                                value={
                                    state.skillCreativeAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.productSubmitApplicationModel?.skillCreative
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue} {t('label-point')}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.skillCreative.handleOpen}
                                onChange={action.items.skillCreative.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-skillCreative')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.skillStemAC?.search ?? []}
                                value={
                                    state.skillStemAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.productSubmitApplicationModel?.skillStem
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue} {t('label-point')}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.skillStem.handleOpen}
                                onChange={action.items.skillStem.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-skillStem')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.skillMotorAC?.search ?? []}
                                value={
                                    state.skillMotorAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.productSubmitApplicationModel?.skillMotor
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue} {t('label-point')}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.skillMotor.handleOpen}
                                onChange={action.items.skillMotor.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-skillMotor')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.skillSocialAC?.search ?? []}
                                value={
                                    state.skillSocialAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.productSubmitApplicationModel?.skillSocial
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue} {t('label-point')}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.skillSocial.handleOpen}
                                onChange={action.items.skillSocial.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-skillSocial')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}></Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{background: 'grey'}}
                        >
                            {t('label-uploadFile')}
                            <VisuallyHiddenInput
                                type="file"
                                multiple
                                accept="image/png, image/jpeg" // Giới hạn định dạng ngay tại browser
                                onChange={(event) => {
                                const files = Array.from(event.target.files || []);
                                const maxSize = 2 * 1024 * 1024; // 2MB

                                const validFiles = files.filter(file => {
                                    const isValidSize = file.size <= maxSize;
                                    if (!isValidSize) alert(`${file.name} quá lớn (tối đa 2MB).`);
                                    return isValidSize;
                                });

                                if (validFiles.length > 0) {
                                    action.onChangeFile("images", validFiles);
                                }
                                
                                // Reset input để có thể chọn lại cùng một file nếu cần
                                event.target.value = '';
                                }}
                            />
                        </Button>
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
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});