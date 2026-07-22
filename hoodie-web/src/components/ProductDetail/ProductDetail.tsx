/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./ProductDetail.types";
import { useStore } from "./ProductDetailStore";
import { Container } from "@mui/material";
import { ProductDetailContent } from "./ProductDetailContent";

/**
 * ProductDetail
 * 
 * @param props 
 * @returns ProductDetail
 */
export const ProductDetail: React.FC<PageProps> = props => {

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
                <ProductDetailContent />
            </Container>
        </>
    );
};