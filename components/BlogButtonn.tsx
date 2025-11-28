import Link from "next/link"

const BlogButton = ({text}:{text: string | ""}) => {
  return (
    <div>

        <Link
            href="https://gxaurab.hashnode.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans bg-linear-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-fuchsia-500/25"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {text}
        </Link>
    </div>
  )
}

export default BlogButton