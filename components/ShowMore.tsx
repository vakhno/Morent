'use client';
import React from 'react';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '@/utils';
interface Props {
	title: string;
	pageNumber: number;
	isNext: boolean;
	styles?: string;
}

const ShowMore = ({ title, pageNumber, isNext, styles }: Props) => {
	const router = useRouter();
	const handleNavigation = () => {
		const newLimit = (pageNumber + 1) * 10;
		const newPathName = updateSearchParams('limit', newLimit);
		router.push(newPathName, { scroll: false });
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
