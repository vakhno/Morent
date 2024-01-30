'use client';
import React, { useState } from 'react';
import { SearchManufacturer } from '.';
type Props = {};

const SearchBox = (props: Props) => {
	const [manufacturer, setManufacturer] = useState('');
	const handleSearch = () => {};
	return (
		<form action="" className="searchbar" onSubmit={handleSearch}>
			<div className="searchbox__item">
				<SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
			</div>
		</form>
	);
};

export default SearchBox;
