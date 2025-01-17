import SearchForm from '../../app/components/Search-Form'
import { SearchResults } from "../components/Search-Results"

export default function SearchPage() {
    return (
        <main className="container mx-auto px-4 py-8 flex  justify-center flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">Explore Your Next Read</h1>
            <SearchForm />
            
        </main>
    )
}

