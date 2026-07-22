import '@/styles/globals.css';
import {buildMetadata, viewport as sharedViewport} from '@/lib/seo';

export const metadata = buildMetadata('en');
export const viewport = sharedViewport;

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
