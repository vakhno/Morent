'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Filter, Hero, SearchBox, CarCard } from '@/components/index';
import { getCars } from '@/utils';

export default function Home() {
	const [data, setData] = useState([]);
	const isDataNotEmpty = Boolean(data.length);

	useEffect(() => {
		(async () => {
			const fetchData = await getCars();
			console.log('fetchData', fetchData);
			setData(fetchData);
		})();
	}, []);

	return (
		<main className="overflow-hidden">
			<Hero />
			<div className="mt-12 padding-x padding-y max-width" id="discover">
				<div className="home__text-container">
					<h1 className="text-4xl font-extrabold">Car Catalogue</h1>
					<p> Explore the cars you might like</p>
				</div>
				<div className="home_filters">
					<SearchBox />
				</div>
				<div className="home__filter-container">
					<Filter title="fuel" />
					<Filter title="year" />
				</div>
				{isDataNotEmpty ? (
					<section>
						<div className="home__cars-wrapper">
							{data.map((item) => (
								<CarCard car={item} />
							))}
						</div>
					</section>
				) : (
					<div className="home__error-container">
						<h2 className="text-black text-xl font-bold">Ooops, no results</h2>
						{/* <p>{data?.message}</p> */}
					</div>
				)}
			</div>
		</main>
	);
}
