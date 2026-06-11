/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./ProductRegistration.types";
import { useStore } from "./ProductRegistrationStore";
import { Container } from "@mui/material";
import { ProductRegistrationContent } from "./ProductRegistrationContent";

/**
 * ProductRegistration
 * 
 * @param props 
 * @returns ProductRegistration
 */
export const ProductRegistration: React.FC<PageProps> = props => {

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
                <ProductRegistrationContent />
            </Container>
        </>
    );
};