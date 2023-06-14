import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../App"
import PageNav from './PageNav'; 
import Trending from './Trending';
import Popular from './Popular';

export default function Explore() { 
    const contexts = useContext(AppContext) 
    return (
        <> 
           <PageNav host={contexts.host} requestToken={contexts.requestToken}/>
           <Trending/>
           <Popular/>
        </>
    );
}
