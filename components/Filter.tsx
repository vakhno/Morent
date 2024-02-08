'use client';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SelectorType } from '@/types';
import Chevrone from '@/public/chevron-up-down.svg';
import { updateSearchParams } from '@/utils';

interface Props {
	title: string;
	options: SelectorType[];
	handleChange: (value: string) => void;
	value?: string;
}

const Filter = ({ title, options, handleChange, value }: Props) => {
	const [selected, setSelected] = useState<SelectorType>(
		(value && options.find((option) => option.value === value)) || options[0],
	);

	const router = useRouter();

	const handleUpdateParams = (e: SelectorType) => {
		const { value } = e;
		const newPathName = updateSearchParams(title, value);
		router.push(newPathName, { scroll: false });
		handleChange(value);
	};

	return (
		<div className="w-fit max-sm:w-full">
			<Listbox
				value={selected}
				onChange={(e) => {
					setSelected(e);
					handleUpdateParams(e);
				}}>
				<div className="relative w-fit z-10 max-sm:w-full">
					<Listbox.Button className="custom-filter__btn">
						<span className="block truncate">{selected.title}</span>
						<Image
							src={Chevrone}
							width={20}
							height={20}
							className="ml-4 object-contain"
							alt="up & down"
						/>
					</Listbox.Button>
					<Transition
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="custom-filter__options">
							{options.map((option) => {
								return (
									<Listbox.Option
										key={option.value}
										value={option}
										className={({ active }) =>
											`relative cursor-default select-none py-2 px-4 ${
												active ? 'bg-primary-blue text-white' : 'bg-white text-gray-900'
											}`
										}>
										{({ selected }) => (
											<span
												className={`block truncate ${selected ? 'font-medium' : 'font-noraml'}`}>
												{option.title}
											</span>
										)}
									</Listbox.Option>
								);
							})}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default Filter;
