'use client';
import React, { useState } from 'react';
import { ComboboxSelector } from '.';
import Glass from '@/public/magnifying-glass.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components';
import { manufacturers } from '@/constants';
import { RootState, useAppDispatch } from '@/redux/store';
import { fetchData } from '@/redux/slices/dataSlice';
import { setSearchMake, setSearchModel } from '@/redux/slices/searchSlice';
import { useSelector } from 'react-redux';

const SearchBox = () => {
	const { vehiclePerPage } = useSelector((state: RootState) => state.data);
	const { filterFuel, filterYear } = useSelector((state: RootState) => state.filter);
	const { searchMake, searchModel } = useSelector((state: RootState) => state.search);
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchMake === '' && searchModel === '') {
			return alert('Please fill in the search bar');
		}
		updateSearchParams(searchMake.toLowerCase(), searchModel.toLowerCase());
		const params = {
			make: searchMake,
			model: searchModel,
			fuel: filterFuel,
			year: filterYear,
			limit: vehiclePerPage,
		};
		dispatch(fetchData(params));
	};

	const updateSearchParams = (make: string, model: string) => {
		const searchParams = new URLSearchParams(window.location.search);

		if (model) {
			searchParams.set('model', model);
		} else {
			searchParams.delete('model');
		}

		if (make) {
			searchParams.set('make', make);
		} else {
			searchParams.delete('make');
		}

		const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

		router.push(newPathname, { scroll: false });
	};

	return (
		<form action="" className="searchbar" onSubmit={handleSearch}>
			<div className="searchbar__item">
				<ComboboxSelector
					options={manufacturers}
					value={searchMake}
					handleChange={(e) => dispatch(setSearchMake(e))}
					styles="sm:mr-4"
				/>
			</div>
			<div className="searchbar__item">
				<Input
					value={searchModel}
					placeholder="Tiguan"
					leftIcon={{
						src: '/model-icon.png',
						alt: 'glass-icon',
						width: 20,
						height: 20,
						className: 'object-contain',
					}}
					handleOnChange={(e) => dispatch(setSearchModel(e))}
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
