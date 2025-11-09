import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './Layout.module.css';
import Header from './Header';
import Footer from './Footer';

export function GradientBackground({ variant, className }) {
  const classes = classNames(
    {
      [styles.colorBackground]: variant === 'large',
      [styles.colorBackgroundBottom]: variant === 'small',
    },
    className
  );

  return <div className={classes} />;
}

export default function Layout({ children, globalData, maxWidth = 'max-w-6xl' }) {
  const setAppTheme = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const lightMode = localStorage.getItem('theme') === 'light';

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else if (lightMode) {
      document.documentElement.classList.remove('dark');
    }
    return;
  };

  const handleSystemThemeChange = () => {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.onchange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };
  };

  useEffect(() => {
    setAppTheme();
  }, []);

  useEffect(() => {
    handleSystemThemeChange();
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      <div className={`flex flex-col ${maxWidth} w-full mx-auto px-4 md:px-8`}>
        <Header companyName={globalData?.companyName} />
        <main className="flex-grow py-12">
          {children}
        </main>
        <Footer
          companyName={globalData?.companyName}
          copyrightText={globalData?.footerText}
          contactEmail={globalData?.contactEmail}
        />
      </div>
    </div>
  );
}
