"use client"
import { useState } from "react";
import type { JokesDetail } from "../Types/HashnodeGraphQL";

const URL = "https://official-joke-api.appspot.com/jokes/random"


export const useJokes = () => {
    const [showJoke, setShowJoke] = useState(false)
    const [joke, setJoke] = useState<JokesDetail | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchJoke = async () => {
        setLoading(true)
        try {
            const response = await fetch(URL)
            const data = await response.json()
            setJoke(data)
            setShowJoke(true)
        } catch (error) {
            console.error("Error fetching joke:", error)
            setJoke(null)
            setShowJoke(true)
        } finally {
            setLoading(false)
        }
    }

    const handleToggle = () => {
        if (!showJoke) {
            fetchJoke()
        } else {
            setShowJoke(false)
            setJoke(null)
        }
    }

    const ReFetchJoke = () => {
        fetchJoke() 
    }

    return { joke, loading, showJoke, handleToggle, ReFetchJoke }
}
