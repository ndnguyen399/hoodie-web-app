/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import type { PageProps } from "./Login.types";
import { useStore } from "./LoginStore";
import { LoginContent } from "./LoginContent";

/**
 * Login
 * 
 * @param props 
 * @returns Login
 */
export const Login: React.FC<PageProps> = props => {
    const navigate = useNavigate();

    useStore({
        ...props,
        onDismiss: () => navigate(-1)
    });

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    paddingTop: 2,
                    paddingBottom: 2
                }}
            >
                <LoginContent />
            </Container>
        </>
    );
};