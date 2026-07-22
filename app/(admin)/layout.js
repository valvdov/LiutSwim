import '@/styles/admin.css';

export const metadata = {
    title: 'Liut Swim — Admin',
    robots: {index: false, follow: false},
};

export default function AdminRootLayout({children}) {
    return (
        <html lang="ru">
        <body className="admin-body">{children}</body>
        </html>
    );
}
