'use client';
import React from 'react';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '@/utils';
import { useAppDispatch } from '@/redux/store';
import { setVehiclePerPage } from '@/redux/slices/dataSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchData } from '@/redux/slices/dataSlice';

interface Props {
	title: string;
	pageNumber: number;
	isNext: boolean;
	styles?: string;
}

const ShowMore = ({ title, pageNumber, isNext, styles }: Props) => {
	const router = useRouter();
	const { vehiclePerPage } = useSelector((state: RootState) => state.data);
	const { filterFuel, filterYear } = useSelector((state: RootState) => state.filter);
	const { searchMake, searchModel } = useSelector((state: RootState) => state.search);

	const dispatch = useAppDispatch();
	const handleNavigation = () => {
		const newLimit = ((pageNumber + 1) * 10).toString();
		const newPathName = updateSearchParams('limit', newLimit);
		router.push(newPathName, { scroll: false });
		dispatch(setVehiclePerPage(newLimit));
		const params = {
			make: searchMake.toString(),
			model: searchModel.toString(),
			fuel: filterFuel.toString(),
			year: filterYear.toString(),
			limit: vehiclePerPage.toString(),
		};
		dispatch(fetchData(params));
	};

	return (
		<>
			{!isNext ? (
				<Button
					title={title}
					styles={`py-[16px] rounded-full bg-primary-blue text-white text-[14px] leading-[17px] font-bold max-sm:w-full ${styles}`}
					type="submit"
					handleClick={handleNavigation}
				/>
			) : null}
		</>
	);
};

export default ShowMore;
