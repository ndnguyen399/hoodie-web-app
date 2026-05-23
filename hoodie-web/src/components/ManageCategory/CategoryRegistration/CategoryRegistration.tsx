/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./CategoryRegistration.types";
import { useStore } from "./CategoryRegistrationStore";
import { Container } from "@mui/material";
import { CategoryRegistrationContent } from "./CategoryRegistrationContent";

/**
 * CategoryRegistration
 * 
 * @param props 
 * @returns CategoryRegistration
 */
export const CategoryRegistration: React.FC<PageProps> = props => {

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
                <CategoryRegistrationContent />
            </Container>
        </>
    );
};