import styles from './About.module.scss';
import { Layout } from 'components/Layout/Layout.tsx';
import { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <Layout className={styles.wrapper}>
      <article className={styles.appInfo}>
        <h2>Application for Currency Conversion</h2>
        <p>Created an application for currency conversion using an
          <a target="_blank" rel="noopener noreferrer" href="https://exchangeratesapi.io/documentation/"> API</a>.
        </p>
        <section>
          <h3>Instructions</h3>
          <ul>
            <li>Created instructions on how to run the application in Readme.md</li>
            <li>Used the following stack and tools: React, TypeScript, Redux-Toolkit, SASS, React-router-dom.</li>
          </ul>
        </section>
      </article>
    </Layout>
  );
};