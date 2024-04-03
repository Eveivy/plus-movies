import { useState, useContext, Suspense, lazy } from 'react';
import { AppContext } from "../App"
import PageNav from './PageNav';

const Trending = lazy(() => import('./Trending'));
const Popular = lazy(() => import('./Popular'));


export default function Explore() {
    const contexts = useContext(AppContext);
    const [showSearchResults, setShowSearchResult] = useState(false)

    return (
        <>
            <PageNav setShowSearchResult={setShowSearchResult} host={contexts.host} requestToken={contexts.requestToken} />
            <Suspense fallback={<span className="loader"></span>}>
                {
                    showSearchResults ? '' : 
                    <>
                        <Trending />
                        <Popular />
                    </>
                }
            </Suspense>
        </>
    );
}




