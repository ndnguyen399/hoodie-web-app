/**
 * @author duynguyen © 2025
 */
import { Box, Button, Checkbox, CircularProgress, CssBaseline, Divider, FormControl, FormControlLabel, FormLabel, Link, Stack, styled, TextField, Typography } from "@mui/material";
import MuiCard from '@mui/material/Card';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useEffect } from "react";
import type { PageProps } from "./Register.types";
import { useStore } from "./RegisterStore";

/**
 * RegisterContent
 * 
 * @param props 
 * @returns RegisterContent
 */
export const RegisterContent: React.FC<PageProps> = props => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <CircularProgress />
    }

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // if (nameError || emailError || passwordError) {
    //   event.preventDefault();
    //   return;
    // }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //     name: data.get('name'),
    //     lastName: data.get('lastName'),
    //     email: data.get('email'),
    //     password: data.get('password'),
    //     });
    // };

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" sx={{ justifyContent: 'space-between' }}>
                <Card variant="outlined">
                    <AppRegistrationIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        {t("label-register")}
                    </Typography>
                    <Box
                        component="form"
                        // onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">{t("label-fullName")}</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                placeholder={t("label-placeholderFullName")}
                                //error={nameError}
                                //helperText={nameErrorMessage}
                                //color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">{t("label-email")}</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder={t("label-placeholderEmail")}
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                // error={emailError}
                                // helperText={emailErrorMessage}
                                // color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="phone">{t("label-numberPhone")}</FormLabel>
                            <TextField
                                fullWidth
                                id="phone"
                                placeholder={t("label-placeholderNumberPhone")}
                                name="phone"
                                autoComplete="phone"
                                variant="outlined"
                                // error={emailError}
                                // helperText={emailErrorMessage}
                                // color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">{t("label-password")}</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                // error={passwordError}
                                // helperText={passwordErrorMessage}
                                // color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={t("label-allowExtraEmails")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // onClick={validateInputs}
                        >
                        {t("label-buttonRegister")}
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>{t("label-or")}</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            {t("label-haveAnAccount")}{' '}
                            <Link
                                href="/sign-in"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                {t("label-buttonLogin")}
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
};
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 108dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));