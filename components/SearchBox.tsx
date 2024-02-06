'use client';
import React, { useState } from 'react';
import { ComboboxSelector } from '.';
import Glass from '@/public/magnifying-glass.svg';
import Image from 'next/image';
import Model from '@/public/model-icon.png';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components';
import { manufacturers } from '@/constants';

type Props = {};

const SearchBox = (props: Props) => {
	const [manufacturer, setManufacturer] = useState('');
	const [model, setModel] = useState('');
	const router = useRouter();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (manufacturer === '' && model === '') {
			return alert('Please fill in the search bar');
		}

		updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
	};

	const updateSearchParams = (model: string, manufacturer: string) => {
		const searchParams = new URLSearchParams(window.location.search);

		if (model) {
			searchParams.set('model', model);
		} else {
			searchParams.delete('model');
		}

		if (manufacturer) {
			searchParams.set('manufacturer', manufacturer);
		} else {
			searchParams.delete('manufacturer');
		}

		const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

		router.push(newPathname, { scroll: false });
	};

	return (
		<form action="" className="searchbar" onSubmit={handleSearch}>
			<div className="searchbar__item">
				<ComboboxSelector
					options={manufacturers}
					manufacturer={manufacturer}
					setManufacturer={setManufacturer}
					styles="sm:mr-4"
				/>
			</div>
			<div className="searchbar__item">
				<Input
					value={model}
					placeholder="Tiguan"
					leftIcon={{
						src: '/model-icon.png',
						alt: 'glass-icon',
						width: 20,
						height: 20,
						className: 'object-contain',
					}}
					handleOnChange={setModel}
					styles="w-full sm:mr-4"
				/>
			</div>
			<Button
				title="Search"
				styles="py-[16px] rounded-full bg-primary-blue text-white text-[14px] leading-[17px] font-bold max-sm:w-full"
				type="submit"
				rightIcon={
					<Image src={Glass} alt="glass-icon" width={40} height={40} className="object-contain" />
				}
			/>
		</form>
	);
};

export default SearchBox;
