/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./VoucherSearch.types";
import { useStore } from "./VoucherSearchStore";
import { Container } from "@mui/material";
import { VoucherSearchContent } from "./VoucherSearchContent";

/**
 * VoucherSearch
 * 
 * @param props 
 * @returns VoucherSearch
 */
export const VoucherSearch: React.FC<PageProps> = props => {

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
                <VoucherSearchContent />
            </Container>
        </>
    );
};