/**
 * @author duynguyen © 2025
 */
import React, { useEffect } from "react";
import { Autocomplete, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, type SelectChangeEvent, type SelectProps } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { CommandBar } from "@fluentui/react";
import type { PageProps } from "./CategoryRegistration.types";
import { useStore } from "./CategoryRegistrationStore";
import PageContainer from "../PageContainer";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
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
                title={t('label-pageTitleCategoryCreate')}
                breadcrumbs={[{ title: t('label-pageTitleCategorySearch'), path: Constants.routeCategorySearch }, { title: t('label-buttonCreate') }]}
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
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
                        <TextField
                            name="categoryName"
                            label={t('label-categoryName')}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 100
                                },
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
                                options={state.skillTypeAC?.search ?? []}
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
                        <FormControl fullWidth> {/* error={!!formErrors.role} */}
                            <Autocomplete
                                disablePortal
                                options={state.ageGroupAC?.search ?? []}
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
                    {t('label-buttonCreate')}
                </Button>
            </Stack>
            </Box>
            </PageContainer>
        </>
    );
};

// const INITIAL_FORM_VALUES: Partial<EmployeeFormState['values']> = {
//   role: 'Market',
//   isFullTime: true,
// };

// export interface EmployeeFormState {
//   values: Partial<Omit<Employee, 'id'>>;
//   errors: Partial<Record<keyof EmployeeFormState['values'], string>>;
// }

// export type FormFieldValue = string | string[] | number | boolean | File | null;

// export interface EmployeeFormProps {
//   formState: EmployeeFormState;
//   onFieldChange: (
//     name: keyof EmployeeFormState['values'],
//     value: FormFieldValue,
//   ) => void;
//   onSubmit: (formValues: Partial<EmployeeFormState['values']>) => Promise<void>;
//   onReset?: (formValues: Partial<EmployeeFormState['values']>) => void;
//   submitButtonLabel: string;
//   backButtonPath?: string;
// }
