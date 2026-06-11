/**
 * @author duynguyen © 2025
 */
import React, { useEffect } from "react";
import { Autocomplete, Box, Button, CircularProgress, FormControl, FormGroup, Grid, Stack, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { CommandBar } from "@fluentui/react";
import type { PageProps } from "./CategoryRegistration.types";
import { useStore } from "./CategoryRegistrationStore";
import PageContainer from "../PageContainer";
import Constants from "../../common/Constants";
// import Image from "../../templates/Image";

/**
 * CategoryRegistrationContent
 * 
 * @param props 
 * @returns CategoryRegistrationContent
 */
export const CategoryRegistrationContent: React.FC<PageProps> = props => {
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
                title={state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-pageTitleCategoryCreate') : t('label-pageTitleCategoryUpdate')}
                breadcrumbs={[{ title: t('label-pageTitleCategorySearch'), path: Constants.routeCategorySearch }, { title: state.requestType === Constants.REUEST_TYPE_CREATE ? t('label-buttonCreate') : t('label-buttonUpdate') }]}
            >
            <Box
                component="form"
                onSubmit={action.submitCategory.execute}
                noValidate
                autoComplete="off"
                // onReset={action.reset.execute}
                sx={{ width: '100%' }}
            >
            <FormGroup>
                <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'none' }}>
                        <TextField
                            name="categoryId"
                            label={t('label-categoryId')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
                            }} 
                            value={state.categorySubmitApplicationModel?.categoryId!}
                            onChange={(e) => {
                                action.onChangeField("categoryId", e.target.value);
                            }}
                            fullWidth
                            type="hidden"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="categoryName"
                            label={t('label-categoryName')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
                                inputLabel: {
                                    shrink: state.categorySubmitApplicationModel?.categoryName ? true : false
                                }
                            }} 
                            value={state.categorySubmitApplicationModel?.categoryName!}
                            onChange={(e) => {
                                action.onChangeField("categoryName", e.target.value);
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.skillTypeAC?.search ?? []}
                                value={
                                    state.skillTypeAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.categorySubmitApplicationModel?.skillType
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.skillType.handleOpen}
                                onChange={action.items.skillType.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-skillType')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <FormControl fullWidth>
                            <Autocomplete
                                disablePortal
                                disableClearable={false}
                                options={state.ageGroupAC?.search ?? []}
                                value={
                                    state.ageGroupAC?.search?.find(
                                        item =>
                                            item.codeName ===
                                            state.categorySubmitApplicationModel?.ageGroup
                                    ) ?? null
                                }
                                getOptionLabel={(option) => option.codeValue ?? ''}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.codeName}>
                                    {option.codeValue}
                                    </li>
                                )}
                                isOptionEqualToValue={(option, value) => 
                                    option.codeName === value.codeName
                                }
                                onOpen={action.items.ageGroup.handleOpen}
                                onChange={action.items.ageGroup.onChange}
                                sx={{ width: '100%' }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('label-ageGroup')}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="categoryDescription"
                            label={t('label-categoryDescription')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 255
                                },
                                inputLabel: {
                                    shrink: state.categorySubmitApplicationModel?.categoryDescription ? true : false
                                }
                            }} 
                            value={state.categorySubmitApplicationModel?.categoryDescription!}
                            onChange={(e) => {
                                action.onChangeField("categoryDescription", e.target.value);
                            }}
                            fullWidth
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