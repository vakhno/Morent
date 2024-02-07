import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.svg';
import { footerLinks } from '@/constants';

const Footer = () => {
	return (
		<footer className="flex felx-col text-black-100 mt-5 border-t border-gray-100">
			<div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
				<div className="flex flex-col justify-start items-center gap-6">
					<Image src={Logo} alt="logo" width={118} height={18} className="object-contain" />
					<p className="text-base text-gray-700">
						Carhub 2024. <br /> All right reserved ©.
					</p>
				</div>
				<div className="footer__links">
					{footerLinks.map((link) => {
						return (
							<div key={link.title} className="footer__link">
								<h3 className="text-bold">{link.title}</h3>
								{link.links.map((subLink) => {
									return (
										<Link key={subLink.title} href={subLink.url} className="text-gray-500">
											{subLink.title}
										</Link>
									);
								})}
							</div>
						);
					})}
				</div>
				<div className="w-full flex flex-col justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 py-10 px-6">
					<p>@2024 CurHub. All rights reserved ©.</p>
					<div className="footer__copyrights-link">
						<Link href="/" className="text-gray-500">
							Privacy Policy
						</Link>
						<Link href="/" className="text-gray-500">
							Terms of Use
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
