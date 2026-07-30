/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./VoucherRegistration.types";
import { useStore } from "./VoucherRegistrationStore";
import { Container } from "@mui/material";
import { VoucherRegistrationContent } from "./VoucherRegistrationContent";

/**
 * VoucherRegistration
 * 
 * @param props 
 * @returns VoucherRegistration
 */
export const VoucherRegistration: React.FC<PageProps> = props => {

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
                <VoucherRegistrationContent />
            </Container>
        </>
    );
};