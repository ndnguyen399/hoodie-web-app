/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./OrderSearch.types";
import { useStore } from "./OrderSearchStore";
import { Container } from "@mui/material";
import { OrderSearchContent } from "./OrderSearchContent";

/**
 * OrderSearch
 * 
 * @param props 
 * @returns OrderSearch
 */
export const OrderSearch: React.FC<PageProps> = props => {

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
                <OrderSearchContent />
            </Container>
        </>
    );
};