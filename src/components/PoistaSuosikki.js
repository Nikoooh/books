import { Container, Button } from "@mui/material"
import { useNavigate, useParams, Link } from "react-router-dom"

function PoistaSuosikki(props) {

    const { id } = useParams();
    const nav = useNavigate()

    const poistettava = props.suosikit.filter((x) => {
        return (x.id === id)
    });

    const poista = () => {

        props.setSuosikit(props.suosikit.filter((x) => {
            return (x.id !== id)
        }));

        nav("/suosikit")
    }

    return (
        <Container style={{marginTop: 30}}>
            <Button color="error" variant="contained" onClick={poista}>Haluatko varmasti poistaa kirjan: {poistettava[0].kirja.volumeInfo.title}</Button>
            <br></br><br></br>
            <Button variant="contained" component={Link} to="/suosikit">Palaa</Button>
        </Container>
    )
}

export default PoistaSuosikki