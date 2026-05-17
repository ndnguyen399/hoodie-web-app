/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import type { PageProps } from "./Register.types";
import { useStore } from "./RegisterStore";
import { RegisterContent } from "./RegisterContent";

/**
 * Register
 * 
 * @param props 
 * @returns Register
 */
export const Register: React.FC<PageProps> = props => {
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
                <RegisterContent />
            </Container>
        </>
    );
};