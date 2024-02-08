import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
	quantity: number;
}

const CardSkeleton = ({ quantity }: Props) => {
	return (
		<>
			{Array.from({ length: quantity }).map((_, index) => (
				<Skeleton className="car-card" height={390} key={index} />
			))}
		</>
	);
};

export default CardSkeleton;
