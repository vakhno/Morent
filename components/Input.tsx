import Image, { ImageProps } from 'next/image';
import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
	leftIcon: ImageProps;
	handleOnChange: (value: string) => void;
	styles?: string;
};

const Input = ({ leftIcon, handleOnChange, styles, ...rest }: Props) => {
	return (
		<div className={`realtive ${styles}`}>
			{leftIcon ? (
				<div className="absolute transform -translate-y-1/2 top-1/2 ml-4">
					<Image {...leftIcon} />
				</div>
			) : null}
			<input
				onChange={(e) => handleOnChange(e.target.value)}
				{...rest}
				className="searchbar__input"
			/>
		</div>
	);
};

export default Input;
