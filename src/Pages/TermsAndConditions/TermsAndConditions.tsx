import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TermsAndConditions.css';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function TermsAndConditions() {
    return (
        <div
            className="card"
            style={{
                boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)',
                margin: '20px',
            }}
        >
            <Container fluid className="custom_Container">
                <br />
                <h2 className="text-center">
                    {' '}
                    Regulamin Korzystania ze Strony Internetowej
                </h2>

                <br />
                <hr />
            </Container>
            <Container>
                <Row>
                    <h3>I. Postanowienia ogólne</h3>{' '}
                    <div className="custom_div">
                        Niniejszy regulamin określa zasady korzystania ze strony
                        internetowej poświęconej zajmowaniu się zwierzętami, w
                        tym ich opiece i adopcji. Właścicielem strony jest
                        DOMIES, z siedzibą w Łodzi. Korzystanie ze strony
                        oznacza akceptację niniejszego regulaminu oraz
                        zobowiązanie się do jego przestrzegania.
                    </div>
                    <h3>II. Zasady korzystania z serwisu </h3>{' '}
                    <div className="custom_div">
                        1. Użytkownicy mogą korzystać ze strony w celach
                        informacyjnych, edukacyjnych oraz w celu znalezienia
                        opiekuna dla zwierzęcia lub podjęcia się opieki nad
                        zwierzęciem.
                        <br /> 2. Zabronione jest wykorzystywanie strony do
                        działań niezgodnych z prawem, w tym handlu zwierzętami w
                        sposób naruszający przepisy prawa. <br />
                        3. Każdy użytkownik zobowiązuje się do podawania
                        prawdziwych danych podczas rejestracji i kontaktu z
                        innymi użytkownikami.
                    </div>
                    <h3>III. Rejestracja i konto użytkownika</h3>
                    <div className="custom_div">
                        1. Rejestracja na stronie jest opcjonalna, ale wymagana
                        w celu skorzystania z funkcji dodawania ogłoszeń i
                        kontaktowania się z innymi użytkownikami.
                        <br /> 2. Użytkownik zobowiązuje się do zabezpieczenia
                        swoich danych logowania i nieudostępniania ich osobom
                        trzecim. <br />
                        3. Administrator ma prawo usunąć konto użytkownika w
                        przypadku naruszenia regulaminu.
                    </div>
                    <h3>IV. Dodawanie ogłoszeń</h3>{' '}
                    <div className="custom_div">
                        1. Każde ogłoszenie dotyczące zwierzęcia powinno
                        zawierać rzetelne informacje na jego temat, w tym wiek,
                        stan zdrowia oraz warunki adopcji lub opieki. <br />
                        2. Zabronione jest dodawanie ogłoszeń wprowadzających w
                        błąd, zawierających treści obraźliwe lub niezgodne z
                        prawem.
                    </div>
                    <h3>V. Dodawanie aplikaci oraz opinii</h3>{' '}
                    <div className="custom_div">
                        1. Każda aplikacja dotycząca zwierzęcia powinna zawierać
                        rzetelne informacje na jego temat, w tym wiek, stan
                        zdrowia oraz warunki adopcji lub opieki. <br />
                        2. Zabronione jest dodawanie aplikacji oraz opinii
                        wprowadzających w błąd, zawierających treści obraźliwe
                        lub niezgodne z prawem.
                        <br />
                        3. Do każdej aplikacji do oferty możemy dodać jedną
                        opinię.
                    </div>
                    <h3>VI. Odpowiedzialność użytkowników</h3>{' '}
                    <div className="custom_div">
                        1. Użytkownicy ponoszą pełną odpowiedzialność za treści,
                        które zamieszczają na stronie. <br />
                        2. Administrator nie ponosi odpowiedzialności za skutki
                        wynikające z kontaktu między użytkownikami oraz za treść
                        ogłoszeń zamieszczanych przez użytkowników. <br />
                        3. W przypadku naruszenia przepisów prawa przez
                        użytkownika, administrator ma prawo zgłosić sprawę
                        odpowiednim organom.
                    </div>
                    <h3>VII. Ochrona danych osobowych</h3>{' '}
                    <div className="custom_div">
                        1. Dane osobowe użytkowników są przetwarzane zgodnie z
                        polityką prywatności dostępną na stronie internetowej.
                        <br /> 2. Użytkownik ma prawo do wglądu w swoje dane,
                        ich poprawiania oraz żądania ich usunięcia.
                    </div>{' '}
                    <h3>VIII. Postanowienia końcowe</h3>{' '}
                    <div className="custom_div">
                        1. Administrator zastrzega sobie prawo do zmiany
                        regulaminu w dowolnym czasie. Zmiany wchodzą w życie po
                        ich opublikowaniu na stronie. <br />
                        2. Wszelkie spory wynikające z korzystania ze strony
                        będą rozwiązywane zgodnie z przepisami prawa polskiego.{' '}
                        <br />
                        3. W sprawach nieuregulowanych niniejszym regulaminem
                        stosuje się powszechnie obowiązujące przepisy prawa.
                    </div>
                </Row>
            </Container>{' '}
            <Container fluid="true" className="custom_Container">
                <Row className="custom_Row">
                    <Col sm={3}>
                        {/* <div className="custom_Row">Numer telefonu:</div> */}
                        <div
                            className="custom_Row"
                            style={{ alignItems: 'center' }}
                        >
                            <PhoneIcon
                                fontSize="large"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                }}
                            />
                            +45 452 524 525
                        </div>
                    </Col>
                    <Col className="text-center" sm={3}>
                        <div
                            className="custom_Row"
                            style={{ alignItems: 'center' }}
                        >
                            <EmailIcon
                                fontSize="large"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                }}
                            />
                            domies.680@gmail.com
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        // </div>
    );
}

export default TermsAndConditions;
