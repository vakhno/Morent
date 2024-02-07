'use client';
import { useEffect } from 'react';
import { Filter, Hero, SearchBox, CarCard } from '@/components/index';
import { yearsOfProduction, fuels } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { ShowMore } from '@/components';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { fetchData } from '@/redux/slices/dataSlice';
import { RootState } from '@/redux/store';
import { setFilterFuel, setFilterYear } from '@/redux/slices/filterSlice';

export default function Home() {
	const { data, vehiclePerPage } = useSelector((state: RootState) => state.data);
	const { filterFuel, filterYear } = useSelector((state: RootState) => state.filter);
	const { searchMake, searchModel } = useSelector((state: RootState) => state.search);
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const isDataNotEmpty = Boolean(data.length);

	useEffect(() => {
		const params = {
			make: searchMake,
			model: searchModel,
			fuel: filterFuel,
			year: filterYear,
			limit: vehiclePerPage,
		};
		dispatch(fetchData(params));
	}, [vehiclePerPage, filterFuel, filterYear, searchMake, searchModel]);

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
					<Filter title="Fuel" options={fuels} handleChange={(e) => dispatch(setFilterFuel(e))} />
					<Filter
						title="Year"
						options={yearsOfProduction}
						handleChange={(e) => dispatch(setFilterYear(e))}
					/>
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
					</div>
				)}
				<ShowMore
					styles="m-auto mt-8"
					title="Show More"
					pageNumber={((searchParams.get('limit') && Number(searchParams.get('limit'))) || 10) / 10}
					isNext={
						((searchParams.get('limit') && Number(searchParams.get('limit'))) || 10) > data.length
					}
				/>
			</div>
		</main>
	);
}
