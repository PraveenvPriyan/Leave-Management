export { };

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initData: string;
                initDataUnsafe: {
                    query_id: string;
                    user: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                    };
                    auth_date: string;
                    hash: string;
                };
                colorScheme: 'light' | 'dark';
                themeParams: {
                    bg_color: string;
                    text_color: string;
                    hint_color: string;
                    link_color: string;
                    button_color: string;
                    button_text_color: string;
                };
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;
                headerColor: string;
                backgroundColor: string;
                expand: () => void;
                close: () => void;
                ready: () => void;
            };
        };
    }
}
