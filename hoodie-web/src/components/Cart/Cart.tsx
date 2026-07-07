/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./Cart.types";
import { useStore } from "./CartStore";
import { Container } from "@mui/material";
import { CartContent } from "./CartContent";

/**
 * Cart
 * 
 * @param props 
 * @returns Cart
 */
export const Cart: React.FC<PageProps> = props => {

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
                <CartContent />
            </Container>
        </>
    );
};