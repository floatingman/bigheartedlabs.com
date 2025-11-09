import Link from 'next/link';

export default function Button({ href, children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-center';

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-purple-600 dark:hover:border-purple-400',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a href={href} className={classes} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
