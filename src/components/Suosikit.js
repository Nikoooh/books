import {  Button, Container, Typography } from "@mui/material";
import eiKuvaa from "./kuvat/eikuvaa.jpg"
import { Link } from "react-router-dom";

function Suosikit(props) {
    return (
        <Container style={{border: "1px solid gray", borderRadius: "5px", padding: "40px", marginTop: "30px", width: "100%"}}>
            <Button variant="contained" component={Link} to="/" style={{marginLeft: "24px"}}>Palaa etusivulle</Button>
            <Container style={{margin: 0, marginTop: "20px", width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {props.suosikit.map((x, idx) => {
                    return (                    
                        <Container key={x.id} style={{margin: "15px 10px 25px 0px", backgroundColor: "lightgray", padding: "20px", borderRadius: "5px", width: "48%", display: "flex"}}>
                            <Container style={{width: "165px", float: "left"}}>
                                {(x.kirja.volumeInfo.imageLinks) ?   
                                    <img src={x.kirja.volumeInfo.imageLinks.thumbnail} alt="kansi kuva" />
                                :
                                    <img src={eiKuvaa} alt="default kuva jos apissa ei ollut" style={{width: "128px", height: "192px"}} />
                                }
                            </Container>
                            <Container> 
                                <Typography variant="h5">{x.kirja.volumeInfo.title}</Typography>
                                    {(x.kirja.volumeInfo.authors) ? 
                                        <Typography>{x.kirja.volumeInfo.authors.join(', ')}</Typography>
                                    :
                                        <br></br>
                                    }      
                                    <Typography>Julkaistu: {x.kirja.volumeInfo.publishedDate}</Typography>
                                    {(x.kirja.volumeInfo.averageRating) ? 
                                        <Typography>Arvostelu: {x.kirja.volumeInfo.averageRating}/5 ({x.kirja.volumeInfo.ratingsCount})</Typography>                                         
                                    :
                                        <br></br>
                                    }                                              
                                <Button href={x.kirja.volumeInfo.canonicalVolumeLink} target="_blank" variant="contained" color="primary" style={{marginTop: "20px"}}>Lisää tietoa</Button> 
                                <br></br>  
                                <Button variant="contained" color="error" style={{marginTop: "15px"}} component={Link} to={`/PoistaSuosikki/${x.id}`}>Posta Suosikki</Button>     
                            </Container>                                      
                        </Container> 
                    ) 
                })}
            </Container>  
        </Container>
    )
}

export default Suosikit;
