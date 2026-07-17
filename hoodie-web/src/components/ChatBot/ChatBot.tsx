/**
 * @author duynguyen © 2025
 */
import { useNavigate } from "react-router-dom";
import type { PageProps } from "./ChatBot.types";
import { useStore } from "./ChatBotStore";
import { Container } from "@mui/material";
import { ChatBotContent } from "./ChatBotContent";

/**
 * ChatBot
 * 
 * @param props 
 * @returns ChatBot
 */
export const ChatBot: React.FC<PageProps> = props => {

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
                <ChatBotContent />
            </Container>
        </>
    );
};