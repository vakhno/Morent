'use client';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SelectorType } from '@/types';

type Props = {
	title: string;
	options: SelectorType[];
};

const Filter = ({ title, options }: Props) => {
	return <div>Filter</div>;
};

export default Filter;
