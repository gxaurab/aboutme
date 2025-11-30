interface JokesDetail {
    setup: string
    punchline: string
}

interface JokesProps {
    joke: JokesDetail | null
    loading: boolean
}

const Jokes = ({ joke, loading }: JokesProps) => {
    if (loading) {
        return (
            <div className="text-cyan-300 text-sm sm:text-xl font-sans text-center">
                <div className="animate-pulse">Loading joke...</div>
            </div>
        )
    }

    if (!joke) {
        return (
            <div className="text-red-300 text-sm sm:text-xl font-sans text-center">
                <div>Failed to load joke. Try again!</div>
            </div>
        )
    }

    return (
        <div className="text-yellow-300 text-sm sm:text-xl font-sans text-center">
            <div className="">{joke.setup}</div>
            <div className="">- {joke.punchline}</div>
        </div>
    )
}

export default Jokes