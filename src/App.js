import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Etusivu from './components/Etusivu';
import Header from './components/Header';
import PoistaSuosikki from './components/PoistaSuosikki';
import Suosikit from './components/Suosikit';


function App() {

  const [hakuSana, setHakusana] = useState("");
  const [kirjat, setKirjat] = useState({error: null, ladannut: false});
  const [suosikit, setSuosikit] = useState([]);

  const avaaSuosikkiLista = () => {
    if (localStorage.getItem("suosikitLista")) {
      setSuosikit(JSON.parse(localStorage.getItem("suosikitLista")));
    } else {
      setSuosikit([])
    }
  }

  useEffect(() => {
      avaaSuosikkiLista()
    }, [])

  useEffect(() => {
    localStorage.setItem("suosikitLista", JSON.stringify(suosikit))}, 
    [suosikit]);

  const haeKirja = async (e) => {
    setKirjat({...kirjat, ladannut: false});
    try {
      const yht = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${hakuSana}&maxResults=26&printType=books`); 
      const tiedot = await yht.json();

      if (tiedot.error && tiedot.error.code === 400) {
        setKirjat({error: "Lisää kirjan nimi hakukenttään.", ladannut: true})
      } else if (tiedot.totalItems === 0) { 
        setKirjat({error: "Kirjoja ei löydetty. Yritä uudelleen.", ladannut: true})
      } else {
        setKirjat({...tiedot, ladannut: true})
      }

    } catch (error) {
      setKirjat({error: `${error}`, ladannut: true})
    }
  }

  useEffect(() => {
    haeKirja()
  }, [hakuSana]);
  
  return (
    <Container maxWidth="xl">
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Etusivu hakusana={setHakusana} kirjat={kirjat} setSuosikit={setSuosikit} suosikit={suosikit}/>} />
          <Route path="/suosikit" element={<Suosikit suosikit={suosikit}/>} />
          <Route path="/PoistaSuosikki/:id" element={<PoistaSuosikki suosikit={suosikit} setSuosikit={setSuosikit}/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
