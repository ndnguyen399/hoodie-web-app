/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./UserSearch.types";
import { useStore } from "./UserSearchStore";
import { Container } from "@mui/material";
import { UserSearchContent } from "./UserSearchContent";

/**
 * UserSearch
 * 
 * @param props 
 * @returns UserSearch
 */
export const UserSearch: React.FC<PageProps> = props => {

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
                <UserSearchContent />
            </Container>
        </>
    );
};