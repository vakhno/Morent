'use client';
import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Car from '@/public/hero.png';

interface Props {}

const Hero = ({}: Props) => {
	const handleScroll = () => {};
	return (
		<div className="hero">
			<div className="flex-1 pt-36 padding-x">
				<h1 className="hero__title">Find, book or rent a car - quickly and easily!</h1>
				<p className="hero__subtitle">
					Streamline your car rental experience with our effortless booking process.
				</p>
				<Button
					title="Explore Cars"
					type="button"
					styles="bg-primary-blue text-white rounded-full mt-10"
					handleClick={handleScroll}
				/>
			</div>
			<div className="hero__image-container">
				<div className="hero__image">
					<Image src={Car} alt="car" fill className="object-contain" />
				</div>
				<div className="hero__image-overlay"></div>
			</div>
		</div>
	);
};

export default Hero;
