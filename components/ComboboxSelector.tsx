'use client';
import { Combobox, Transition } from '@headlessui/react';
import CarLogo from '@/public/car-logo.svg';
import { SelectorType } from '@/types';
import Image from 'next/image';
import { useState, Fragment } from 'react';

interface Props {
	manufacturer: string;
	setManufacturer: (value: string) => void;
	options: SelectorType[];
	styles: string;
}

const ComboboxSelector = ({ manufacturer, setManufacturer, options, styles }: Props) => {
	const [query, setQuery] = useState('');

	const filteredManufacturers =
		query === ''
			? options
			: options.filter((option) =>
					option.value
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, '')),
			  );

	return (
		<div className={`search-manufacturer ${styles}`}>
			<Combobox value={manufacturer} onChange={setManufacturer}>
				<div className="relative w-full">
					<Combobox.Button className="absolute top-[14px]">
						<Image src={CarLogo} className="ml-4" width={20} height={20} alt="car-logo" />
					</Combobox.Button>
					<Combobox.Input
						className="search-manufacturer__input"
						placeholder="Volkswagen"
						displayValue={(value: string) => value}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<Transition
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opactiy-0"
						afterLeave={() => setQuery('')}>
						<Combobox.Options className="absolute w-full z-10 max-h-[300px] overflow-auto">
							{filteredManufacturers.length === 0 && query !== ''
								? filteredManufacturers.map((manufacturer) => {
										return (
											<Combobox.Option
												key={manufacturer.value}
												value={manufacturer.value}
												className="search-manufacturer__option ">
												Create '{query}'
											</Combobox.Option>
										);
								  })
								: filteredManufacturers.map((manufacturer) => {
										return (
											<Combobox.Option
												key={manufacturer.value}
												value={manufacturer.value}
												className={({ active }) =>
													`relative search-manufacturer__option ${
														active ? 'bg-primary-blue text-white' : 'text-gray-900 bg-white'
													}`
												}>
												{({ selected, active }) => {
													return (
														<>
															<span
																className={`block truncate ${
																	selected ? 'font-medium' : 'font-normal'
																}`}>
																{manufacturer.title}
															</span>
															{selected ? (
																<span
																	className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																		active ? 'text-white' : 'text-teal-600'
																	}`}></span>
															) : null}
														</>
													);
												}}
											</Combobox.Option>
										);
								  })}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default ComboboxSelector;