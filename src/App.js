import React, {useEffect, useState} from 'react'
import PokeList from "./PokeList";
import axios from 'axios'
import Pagination from "./Pagination";

function App() {
    const [poke, setPoke] = useState([])
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextPageUrl, setNextPageUrl] = useState()
    const [prevPageUrl, setPrevPageUrl] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let cancel
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
            .then(res => {
                setLoading(false)
                setNextPageUrl(res.data.next)
                setPrevPageUrl(res.data.previous)
                setPoke(res.data.results.map(p => p.name))
            })

        return () => {
            cancel()
        }
    }, [currentPageUrl])

    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl)
    }

    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl)
    }

    if (loading) return "loading..."

    return (
        <div className="container">
            <h1 className="title">Gotta Catch Them All!!!</h1>
            <PokeList poke={poke}/>
            <Pagination
                gotoNextPage={nextPageUrl ? gotoNextPage : null}
                gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
            />
        </div>
    )
}

export default App