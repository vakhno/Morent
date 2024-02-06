'use client';
import { MouseEventHandler } from 'react';
import React from 'react';
import Image from 'next/image';

interface Props {
	title: string;
	disabled?: boolean;
	styles: string;
	handleClick?: MouseEventHandler<HTMLButtonElement>;
	rightIcon?: React.ReactElement;
	type: 'button' | 'submit' | 'reset';
}

const Button = ({
	title,
	styles,
	handleClick,
	disabled = false,
	type = 'button',
	rightIcon,
}: Props) => {
	return (
		<button
			disabled={disabled}
			type={type}
			className={`custom-btn ${styles}`}
			onClick={handleClick}>
			<span className={`flex-1`}>{title}</span>
			{rightIcon && <div className="relative w-6 h-6 ml-4">{rightIcon}</div>}
		</button>
	);
};

export default Button;
