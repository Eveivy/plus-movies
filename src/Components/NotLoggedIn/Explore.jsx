import { useContext, Suspense, lazy } from 'react';
import { AppContext } from "../../App"
import PageNav from './PageNav';


const Trending = lazy(() => import('./Trending'));
const Popular = lazy(() => import('./Popular'));


export default function Explore() {
    const contexts = useContext(AppContext);

    return (
        <>
            <PageNav host={contexts.host} requestToken={contexts.requestToken} />
            <Suspense fallback={<span className="loader"></span>}>
                <Trending />
                <Popular />
            </Suspense>
        </>
    );
}




