'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components';
import Logo from '@/public/logo.svg';

const Navbar = () => {
	return (
		<header className="w-full absolute z-10">
			<nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
				<Link href="/" className="flex justify-center items-center">
					<Image src={Logo} alt="logo" width={118} height={18} className="object-contain" />
				</Link>
				<Button
					title="Sign In"
					type="button"
					styles="text-white rounded-full bg-secondary-orange min-w-[130px]"
					handleClick={() => {}}
				/>
			</nav>
		</header>
	);
};

export default Navbar;
