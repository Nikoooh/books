import { Backdrop, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import eiKuvaa from "./kuvat/eikuvaa.jpg"
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom";

function Etusivu(props) {

    const [hakusana, setHakusana] = useState("")

    const haeKirja = () => {
        props.hakusana(hakusana)
    }

    const lisaaSuosikki = (e) => {            
        
        let tarkistus = false;

        props.suosikit.forEach(x => {
            if (x.kirja.id === props.kirjat.items[e.target.id].id) {
                tarkistus = true;
            }
        });

        if (tarkistus) {
            alert("Kirja on jo suosikit listalla.")
        } else { 
            props.setSuosikit([...props.suosikit, {id: uuid(), kirja: props.kirjat.items[e.target.id]}]) 
        }                     
    }

    return (
        <Container style={{border: "1px solid gray", borderRadius: "5px", padding: "40px", marginTop: "30px"}}>
            <Container style={{textAlign: "center", marginBottom: "20px"}}>
                <Typography variant="h3">Kirjahaku</Typography>
            </Container>

            <Container>
                <TextField label="Kirjan nimi" variant="outlined" onChange={(e) => setHakusana(e.target.value)}></TextField>
                <Button variant="contained" onClick={haeKirja} style={{margin: "10px 0 0 20px", height: "40px"}}>Hae kirja</Button>
                <Button variant="contained" color="warning" style={{margin: "10px 0 0 20px", height: "40px"}} component={Link} to="/suosikit">Suosikit</Button>
            </Container> 
 
            <Container style={{margin: 0, marginTop: "20px", width: "100%"}}>
                {(!props.kirjat.ladannut) ? 
                        <Backdrop open={true}>
                            <CircularProgress color="inherit"></CircularProgress>
                        </Backdrop>
                    : (!props.kirjat.error) ? 
                        <Container style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", margin: "auto"}}> 
                            {props.kirjat.items.map((x, idx) => {
                                return (                    
                                    <Container key={idx} className="bkCtn" style={{margin: "15px 10px 25px 0px", backgroundColor: "lightgray", padding: "20px", borderRadius: "5px", width: "48%", display: "flex"}}>
                                        <Container style={{width: "165px", float: "left"}}>
                                            {(x.volumeInfo.imageLinks) ?   
                                                <img src={x.volumeInfo.imageLinks.thumbnail} alt="kansi kuva" />
                                            :
                                                <img src={eiKuvaa} alt="default kuva jos apissa ei ollut" style={{width: "128px", height: "192px"}} />
                                            }
                                        </Container>
                                        <Container> 
                                            <Typography variant="h5">{x.volumeInfo.title}</Typography>
                                                {(x.volumeInfo.authors) ? 
                                                    <Typography>{x.volumeInfo.authors.join(', ')}</Typography>
                                                :
                                                    <br></br>
                                                }      
                                                <Typography>Julkaistu: {x.volumeInfo.publishedDate}</Typography> 
                                                {(x.volumeInfo.averageRating) ? 
                                                    <Typography>Arvostelu: {x.volumeInfo.averageRating}/5 ({x.volumeInfo.ratingsCount})</Typography>                                         
                                                :
                                                    <br></br>
                                                }
                                            <Button href={x.volumeInfo.canonicalVolumeLink} target="_blank" variant="contained" color="primary" style={{marginTop: "20px"}}>Lisää tietoa</Button> 
                                            <br></br>  
                                            <Button variant="contained" color="warning" id={idx} style={{marginTop: "15px"}} onClick={lisaaSuosikki}>Lisää Suosikkeihin</Button>     
                                        </Container>                                      
                                    </Container> 
                                ) 
                            })}
                        </Container>                
                    :
                        <Typography>{props.kirjat.error}</Typography>
                }
            </Container> 

        </Container>
    )
}

export default Etusivu;