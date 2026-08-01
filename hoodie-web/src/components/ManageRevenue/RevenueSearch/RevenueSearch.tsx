/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./RevenueSearch.types";
import { useStore } from "./RevenueSearchStore";
import { Container } from "@mui/material";
import { RevenueSearchContent } from "./RevenueSearchContent";

/**
 * RevenueSearch
 * 
 * @param props 
 * @returns RevenueSearch
 */
export const RevenueSearch: React.FC<PageProps> = props => {

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
                <RevenueSearchContent />
            </Container>
        </>
    );
};