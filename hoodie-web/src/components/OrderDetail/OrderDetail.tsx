/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./OrderDetail.types";
import { useStore } from "./OrderDetailStore";
import { Container } from "@mui/material";
import { OrderDetailContent } from "./OrderDetailContent";

/**
 * OrderDetail
 * 
 * @param props 
 * @returns OrderDetail
 */
export const OrderDetail: React.FC<PageProps> = props => {

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
                <OrderDetailContent />
            </Container>
        </>
    );
};