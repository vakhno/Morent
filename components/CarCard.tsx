'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { CarType } from '@/types';
import { calculateCarRent } from '@/utils';
import Car from '@/public/hero.png';
import Wheel from '@/public/steering-wheel.svg';
import Tire from '@/public/tire.svg';
import Gas from '@/public/gas.svg';
import RightArrow from '@/public/right-arrow.svg';
import { Button, CarDetails } from '@/components/';

interface Props {
	car: CarType;
}

const CarCard = ({ car }: Props) => {
	const { city_mpg, year, make, model, transmission, drive } = car;
	const carRent = calculateCarRent(city_mpg, year);
	const [isModalOpened, setIsModalOpened] = useState(false);

	return (
		<div className="car-card group">
			<div className="car-card__content">
				<h2 className="car-card__content-title">
					{make} {model}
				</h2>
			</div>
			<p className="flex mt-6 text-[32px] font-extrabold">
				<span className="self-start text-[14px] font-semibold">$</span>
				{carRent}
				<span className="self-ent text-[14px] font-medium">/day</span>
			</p>

			<div className="relative w-full h-40 my-3 object-contain">
				<Image src={Car} alt="car model" fill priority className="object-contain" />
			</div>
			<div className="relative flex w-full mt-2">
				<div className="flex grou-hover:invisible w-full justify-between text-gray">
					<div className="flex flex-col justify-center items-center gap-2">
						<Image src={Wheel} width={20} height={20} alt="steering wheel" />
						<p className="text-[14px] ">{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
					</div>
					<div className="flex flex-col justify-center items-center gap-2">
						<Image src={Tire} width={20} height={20} alt="steering wheel" />
						{drive.toUpperCase()}
					</div>
					<div className="flex flex-col justify-center items-center gap-2">
						<Image src={Gas} width={20} height={20} alt="steering wheel" />
						<p className="text-[14px]">{city_mpg} MPG</p>
					</div>
				</div>
				<div className="car-card__btn-container">
					<Button
						title="View More"
						styles="w-full py-[16px] rounded-full bg-primary-blue text-white text-[14px] leading-[17px] font-bold"
						rightIcon={<Image src={RightArrow} alt="arrow" fill className="object-contain" />}
						handleClick={() => setIsModalOpened(true)}></Button>
				</div>
			</div>
			{
				<CarDetails
					isOpen={isModalOpened}
					car={car}
					onHandleClose={() => setIsModalOpened(false)}
				/>
			}
		</div>
	);
};

export default CarCard;
