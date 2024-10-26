import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ pathname }: { pathname: string }) {
  // Remove any query parameters or hash fragments
  const cleanPathname = pathname.split('?')[0].split('#')[0];
  
  // Split the path and remove empty parts
  const paths = cleanPathname.split('/').filter(Boolean);

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 py-2 px-4 transition-colors duration-300">
      <ol className="flex items-center space-x-2 text-sm">
        {/* Home Link */}
        <li>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home
          </Link>
        </li>

        {/* Map through the paths to create breadcrumb links */}
        {paths.map((path, index) => {
          const fullPath = `/${paths.slice(0, index + 1).join('/')}`; // Ensure paths are prefixed with `/`

          return (
            <li key={fullPath} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              {index === paths.length - 1 ? (
                <span className="ml-2 text-gray-700 dark:text-gray-300 capitalize">{path}</span>
              ) : (
                <Link href={fullPath} className="ml-2 text-blue-600 dark:text-blue-400 hover:underline capitalize">
                  {path}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}