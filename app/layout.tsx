import type { Metadata } from 'next';
import './globals.css';
import { Footer, Navbar } from '@/components';
import ReduxProvider from './ReduxProvider';

export const metadata: Metadata = {
	title: 'Car Hub',
	description: 'Discover the best cars!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="relative">
				<ReduxProvider>
					<Navbar />
					{children}
					<Footer />
				</ReduxProvider>
			</body>
		</html>
	);
}
