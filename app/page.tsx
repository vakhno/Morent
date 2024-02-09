'use client';
import { useEffect } from 'react';
import { Filter, Hero, SearchBox, CarCard } from '@/components/index';
import { yearsOfProduction, fuels } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { ShowMore, CardSkeleton } from '@/components';
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { fetchData } from '@/redux/slices/dataSlice';
import { RootState } from '@/redux/store';
import { setFilterFuel, setFilterYear } from '@/redux/slices/filterSlice';
import { setSearchMake, setSearchModel } from '@/redux/slices/searchSlice';
import { setVehiclePerPage } from '@/redux/slices/dataSlice';
import { dataLoadingStatus } from '@/enums';

export default function Home() {
	const { data, vehiclePerPage, dataLoading } = useSelector((state: RootState) => state.data);
	const { filterFuel, filterYear } = useSelector((state: RootState) => state.filter);
	const { searchMake, searchModel } = useSelector((state: RootState) => state.search);
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const make = searchParams.get('make')?.toString() || searchMake || '';
		const model = searchParams.get('model')?.toString() || searchModel || '';
		const year = searchParams.get('year')?.toString() || filterYear || '';
		const fuel = searchParams.get('fuel')?.toString() || filterFuel || '';
		const limit = searchParams.get('limit')?.toString() || vehiclePerPage || '10';
		dispatch(setSearchMake(make));
		dispatch(setSearchModel(model));
		dispatch(setFilterYear(year));
		dispatch(setFilterFuel(fuel));
		dispatch(setVehiclePerPage(limit));
	}, []);

	useEffect(() => {
		const params = {
			make: searchMake.toString(),
			model: searchModel.toString(),
			fuel: filterFuel.toString(),
			year: filterYear.toString(),
			limit: vehiclePerPage.toString(),
		};
		dispatch(fetchData(params));
	}, [vehiclePerPage, filterFuel, filterYear]);

	return (
		<main>
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
					<Filter
						value={filterFuel}
						title="fuel"
						options={fuels}
						handleChange={(e) => dispatch(setFilterFuel(e))}
					/>
					<Filter
						value={filterYear}
						title="year"
						options={yearsOfProduction}
						handleChange={(e) => dispatch(setFilterYear(e))}
					/>
				</div>
				{dataLoading === dataLoadingStatus.LOADING ? (
					<div className="home__cars-wrapper">
						<CardSkeleton quantity={Number(vehiclePerPage)} />
					</div>
				) : dataLoading === dataLoadingStatus.ERROR ? (
					<div className="home__error-container">
						<h2 className="text-black text-xl font-bold">Ooops, error, try to refresh!</h2>
					</div>
				) : dataLoading === dataLoadingStatus.SUCCESS ? (
					data.length ? (
						<>
							<section>
								<div className="home__cars-wrapper">
									{data.map((item, index) => (
										<CarCard key={`${item.make}_${item.model}_${item.year}_${index}`} car={item} />
									))}
								</div>
							</section>
							<ShowMore
								styles="m-auto mt-8"
								title="Show More"
								pageNumber={
									((searchParams.get('limit') && Number(searchParams.get('limit'))) || 10) / 10
								}
								isNext={
									((searchParams.get('limit') && Number(searchParams.get('limit'))) || 10) >
									data.length
								}
							/>
						</>
					) : (
						<div className="home__error-container">
							<h2 className="text-black text-xl font-bold">Ooops, no results!</h2>
						</div>
					)
				) : null}
			</div>
		</main>
	);
}
