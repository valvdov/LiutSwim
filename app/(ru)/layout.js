import '@/styles/globals.css';
import {buildMetadata, viewport as sharedViewport} from '@/lib/seo';

export const metadata = buildMetadata('ru');
export const viewport = sharedViewport;

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <body>{children}</body>
        </html>
    );
}
