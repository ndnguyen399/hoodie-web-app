/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./ProductSearch.types";
import { useStore } from "./ProductSearchStore";
import { Container } from "@mui/material";
import { ProductSearchContent } from "./ProductSearchContent";

/**
 * ProductSearch
 * 
 * @param props 
 * @returns ProductSearch
 */
export const ProductSearch: React.FC<PageProps> = props => {

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
                <ProductSearchContent />
            </Container>
        </>
    );
};