/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./CategorySearch.types";
import { useStore } from "./CategorySearchStore";
import { Container } from "@mui/material";
import { CategorySearchContent } from "./CategorySearchContent";

/**
 * CategorySearch
 * 
 * @param props 
 * @returns CategorySearch
 */
export const CategorySearch: React.FC<PageProps> = props => {

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
                <CategorySearchContent />
            </Container>
        </>
    );
};