import styles from './Layout.module.scss';
import { Header } from 'components/Header/Header.tsx';
import { Footer } from 'components/Footer/Footer.tsx';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className: string;
}

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};