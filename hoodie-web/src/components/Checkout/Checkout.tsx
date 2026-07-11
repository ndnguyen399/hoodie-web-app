/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./Checkout.types";
import { useStore } from "./CheckoutStore";
import { Container } from "@mui/material";
import { CheckoutContent } from "./CheckoutContent";

/**
 * Checkout
 * 
 * @param props 
 * @returns Checkout
 */
export const Checkout: React.FC<PageProps> = props => {

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
                <CheckoutContent />
            </Container>
        </>
    );
};