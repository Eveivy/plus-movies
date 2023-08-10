import { useState, useContext, Suspense, lazy } from 'react';
import { AppContext } from "../../App"
import PageNav from './PageNav';

const Trending = lazy(() => import('./Trending'));
const Popular = lazy(() => import('./Popular'));


export default function Explore() {
    const contexts = useContext(AppContext);
    // console.log(contexts)

    return (
        <>
            <PageNav host={contexts.host} requestToken={contexts.requestToken} handleShowSB={contexts.handleShowSearchBar}/>
            <Suspense fallback={<span className="loader"></span>}>
                <Trending />
                <Popular />
            </Suspense>
        </>
    );
}




