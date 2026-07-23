/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./Profile.types";
import { useStore } from "./ProfileStore";
import { Container } from "@mui/material";
import { ProfileContent } from "./ProfileContent";

/**
 * Profile
 * 
 * @param props 
 * @returns Profile
 */
export const Profile: React.FC<PageProps> = props => {

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
                <ProfileContent />
            </Container>
        </>
    );
};