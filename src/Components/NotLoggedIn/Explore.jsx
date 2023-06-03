import { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AppContext } from "../../App"
import PageNav from './PageNav'; 
import TrendingMovies from './TrendingMovies';

export default function Explore() { 
    const contexts = useContext(AppContext) 
    return (
        <> 
           <PageNav host={contexts.host} requestToken={contexts.requestToken}/>
           <TrendingMovies/>
        </>
    );
}
