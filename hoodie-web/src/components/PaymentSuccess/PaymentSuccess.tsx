/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./PaymentSuccess.types";
import { useStore } from "./PaymentSuccessStore";
import { Container } from "@mui/material";
import { PaymentSuccessContent } from "./PaymentSuccessContent";

/**
 * PaymentSuccess
 * 
 * @param props 
 * @returns PaymentSuccess
 */
export const PaymentSuccess: React.FC<PageProps> = props => {

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
                <PaymentSuccessContent />
            </Container>
        </>
    );
};