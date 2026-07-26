/**
 * @author duynguyen © 2025
 */
import { useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Box, CircularProgress, Collapse, Fade, IconButton, Paper, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import type { PageProps } from "./ChatBot.types";
import { useStore } from "./ChatBotStore";


/**
 * ChatBotContent
 * 
 * @param props 
 * @returns ChatBotContent
 */
export const ChatBotContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // useEffect(() => {
    //     action.load();
    // }, []);
    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [state.chatbotMessagesDomainModel?.search, isOpen]);

    if (state.loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Mở chat tự động tin nhắn chào nếu chưa có
    useEffect(() => {
        // if (isOpen && state.chatbotMessagesDomainModel?.search?.length === 0) {
        //     action.load();
        // }
        if (isOpen && !state.hasInitializedChat) {
            action.load();
            // Đánh dấu là đã khởi tạo/mở lần đầu
            state.hasInitializedChat = true;
        }
    }, [isOpen]);

    return (
        <>
            {/* Nút nổi góc phải dưới */}
            <Fade in={!isOpen}>
                <Box
                    onClick={() => setIsOpen(true)}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 4,
                        cursor: 'pointer',
                        zIndex: 9999,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                            transform: 'scale(1.1)',
                        },
                        transition: 'all 0.3s',
                    }}
                >
                    <Badge color="error" variant="dot" invisible={state.chatbotMessagesDomainModel?.search?.length! <= 1}>
                        <SmartToyIcon sx={{ fontSize: 32 }} />
                    </Badge>
                </Box>
            </Fade>

            {/* Chat Window */}
            <Collapse in={isOpen} timeout={300}>
                <Paper
                    elevation={6}
                    sx={{
                        position: 'fixed',
                        bottom: 100,
                        right: 24,
                        width: { xs: '92vw', sm: 380 },
                        height: 520,
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 10000,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    }}
                >
                    {/* Header */}
                    <Box sx={{
                        p: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                                <SmartToyIcon />
                            </Avatar>
                            <Box>
                                <Typography fontWeight="bold">Trợ lý AI</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Online • Hỗ trợ ngay
                                </Typography>
                            </Box>
                        </Box>

                        <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        p: 2,
                        bgcolor: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                    }}>
                        {state.chatbotMessagesDomainModel?.search?.map((msg) => (
                            <Box
                                key={msg.messageId}
                                sx={{
                                    display: 'flex',
                                    justifyContent: msg.reserveItem01 == '01' ? 'flex-start' : 'flex-end',
                                }}
                            >
                                {msg.reserveItem01 == '01' && (
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', mr: 1 }}>
                                        <SmartToyIcon fontSize="small" />
                                    </Avatar>
                                )}

                                <Paper
                                    sx={{
                                        p: 1.8,
                                        maxWidth: '80%',
                                        borderRadius: msg.reserveItem01 == '01' ? '18px 18px 18px 6px' : '18px 18px 6px 18px',
                                        bgcolor: msg.reserveItem01 == '01' ? '#fff' : 'primary.main',
                                        color: msg.reserveItem01 == '01' ? 'text.primary' : '#fff',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    <Typography variant="body2" 
                                        sx={{
                                            whiteSpace: 'pre-wrap',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'anywhere',
                                        }}
                                    >
                                        {msg.content}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}

                        {state.isTyping && (
                            <Box sx={{ display: 'flex', pl: 5 }}>
                                <Paper sx={{ p: 1.5, borderRadius: '18px 18px 18px 6px' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Đang trả lời...
                                    </Typography>
                                </Paper>
                            </Box>
                        )}

                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                multiline
                                maxRows={3}
                                placeholder="Nhập tin nhắn..."
                                value={state.chatbotMessagesApplicationModel.inputText}
                                onChange={(e) => {
                                    action.onChangeField("inputText", e.target.value);
                                }}
                                // onKeyPress={handleKeyPress}
                            />
                            <IconButton
                                color="primary"
                                onClick={action.submitSentMessageChatbot.execute}
                                disabled={!state.chatbotMessagesApplicationModel?.inputText?.trim()}
                                sx={{
                                    cursor: 'pointer'
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        action.submitSentMessageChatbot.execute();
                                    }
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Collapse>
        </>
    );
};