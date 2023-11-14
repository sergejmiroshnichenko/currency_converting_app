export type NavLinks = {
  href: string;
  src: string;
  alt: string;
  label: string;
};

export const pageData: NavLinks[] = [
  {
    href: '/',
    src: '/image/main.svg',
    alt: 'currency exchange icon',
    label: 'Main',
  },
  {
    href: '/rates',
    src: '/image/currency-exchange.svg',
    alt: 'currency exchange icon',
    label: 'Rates',
  },
  {
    href: '/about',
    src: '/image/about.svg',
    alt: 'about icon',
    label: 'About',
  },
];