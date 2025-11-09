import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ companyName }) {
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <header className="py-6 border-b border-gray-200 dark:border-gray-800">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all">
          {companyName}
        </Link>

        <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-lg font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
