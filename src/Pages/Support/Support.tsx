import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Support.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
function SupportPage() {
    return (
        // <div className="col-md-4 col-10 p-3">
        <div
            className="card"
            style={{
                boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)',
                margin: '20px',
            }}
        >
            <Container
                fluid
                className="custom_Container"
                style={{
                    paddingInline: '10vw',
                }}
            >
                <br />
                <h2 className="text-center"> Witaj na stronie Domies!</h2>

                <br />
                <hr />

                <br />
                <h4 className="text-center">
                    Zapraszamy Cię do zapoznania się z naszą wizją DOMIES.
                </h4>
            </Container>
            <Container>
                <Row className="custom_Row">
                    <Col
                        xs={12}
                        sm={14}
                        md={5}
                        className="align-self-start  responsive_Col"
                    >
                        Platforma Domies została założone w 2025 roku. Wiemy z
                        własnego doświadczenia, że brakuje Nam
                        narzędzia/aplikacji internetowej, która umożliwiłaby
                        właścicielom zwierząt swobodne podróżowanie, czy też
                        wykonywanie zobowiązań służbowych bez konieczności
                        troszczenia się o swojego pupila. Jak wiadomo, nie każdy
                        ma możliwość zostawienia zwierzaka pod opieką rodziny,
                        czy znajomych i wtedy właśnie pomocna może okazać się
                        strona DOMIES!
                        <br />
                        <br />
                        Jest to bezpieczna przestrzeń, na której możemy znaleźć
                        opiekuna, który zajmie się pupilem podczas naszej
                        nieobecności. Dzięki temu zwierzak nie będzie musiał
                        siedzieć sam w domu. Dlatego właśnie stowrzyliśmy to
                        miejsce, które ułatwi komunikację oraz połączy
                        właścicieli zwierząt oraz opiekunów, którzy kochają
                        zwierzaki i mają chęci oraz wolny czas, żeby się nimi
                        zaopiekować.
                        {/* <img
                            src="../../Assets/Images/support1.jpg"
                            // style={{
                            //     width: '250px', // Określona szerokość
                            //     height: '200px',
                            //     borderRadius: '5%',
                            //     objectFit: 'cover',
                            // }}
                            alt="aaaa"
                            //className="w-100 mt-5 image-box"
                        /> */}
                    </Col>
                    <Col xs={12} md={5} sm={14} className="responsive_Col">
                        <img
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '5%',
                                objectFit: 'cover',
                            }}
                            src="/Images/support1.jpg"
                            alt="girl with dog1"
                        />
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="custom_Row">
                    <Col xs={12} md={5} sm={14} className="responsive_Col">
                        <img
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '5%',
                                objectFit: 'cover',
                            }}
                            src="/Images/support2.jpg"
                            alt="girl with dog"
                        ></img>
                    </Col>
                    <Col xs={12} md={5} sm={14} className="responsive_Col">
                        Gwarantujemy, że Twój ukochany zwierzak będzie
                        traktowany przez opiekunów jak najlepiej.Twój pupil ma
                        konkretne potrzeby? Uwielbia długie spacery i kocha
                        przebywać na świeżym powietrzu? A może woli spędzać czas
                        robiąc sobie drzemki na kanapie? Korzystając z pomocy
                        DOMIES możesz znaleść opiekuna, który zapewni Twojemu
                        zwierzakowi wszystko czego potrzebuje.
                        <br />
                        <br />
                        Masz jakieś pytania?
                        <br />
                        Napisz do nas! Kontakt na dole strony. :)
                    </Col>
                </Row>
            </Container>
            <hr />
            <br />
            <Container fluid="true" className="custom_Container">
                <Row className="custom_Row">
                    <Col
                        xs={12}
                        md={5}
                        sm={4}
                        className="align-self-start custom_Col"
                        style={{
                            paddingInline: '6vw',
                            marginTop: '1vh',
                            marginBottom: '1vh',
                        }}
                    >
                        <div>Masz wątpliwości?</div>
                        <h4>
                            Przygotowaliśmy odpowiedzi na najczęściej
                            powtarzające się pytania!
                        </h4>
                    </Col>
                    <Col xs={12} md={5} sm={6}>
                        <div>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography
                                        className="custom_span"
                                        component="span"
                                    >
                                        Co powinnam zrobić w sytuacji, gdy mój
                                        pies przyjmuje leki i wymaga specjalnej
                                        opieki?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Jeśli twoje zwierze przyjmuje leki,
                                    koniecznie poinformuj obiekuna o tym.
                                    Podczas składania rezerwacji jest miejsce na
                                    notatkę. Właśnie tak przekaż opiekunowi
                                    wszelkie szczegółowe informację oraz
                                    instukcję w jaki sposób Twój podopieczny
                                    przyjmuje leki. Pamiętaj o uwzględnieniu
                                    dawki oraz czasu przyjmowania leku. Opiekun
                                    zadba o to, aby twój pupil otrzymał
                                    odpowiednią opiekę.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography
                                        className="custom_span"
                                        component="span"
                                    >
                                        Co powinnam zrobić w sytuacji, gdy mój
                                        pies przyjmuje leki i wymaga specjalnej
                                        opieki?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Jeśli twoje zwierze przyjmuje leki,
                                    koniecznie poinformuj obiekuna o tym.
                                    Podczas składania rezerwacji jest miejsce na
                                    notatkę. Właśnie tak przekaż opiekunowi
                                    wszelkie szczegółowe informację oraz
                                    instukcję w jaki sposób Twój podopieczny
                                    przyjmuje leki. Pamiętaj o uwzględnieniu
                                    dawki oraz czasu przyjmowania leku. Opiekun
                                    zadba o to, aby twój pupil otrzymał
                                    odpowiednią opiekę.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography
                                        className="custom_span"
                                        component="span"
                                    >
                                        Co powinnam zrobić w sytuacji, gdy mój
                                        pies potrzebuje specjalnej diety?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Jeśli zwierzę potrzebuje specjalnej diety,
                                    możesz to przekazać opiekunowi w polu
                                    'notatka dla opiekuna' podczas składania
                                    rezerwacji. Pamiętaj aby przekazać potrzebne
                                    składniki specjalnej diety, żeby opiekun
                                    mógł zadbać o Twojego pupila zgodnie z jego
                                    potrzebami.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography
                                        className="custom_span"
                                        component="span"
                                    >
                                        Jak postąpić w przypadku, gdy Twoje
                                        zwierzę wygenerowało dodatkowe koszty
                                        podczas opieki?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Jeśli zwierzę w okresie opieki dokona
                                    jakichkolwiek zniszczeń, nie jest to winna
                                    właściciela. To na Tobie spoczywa
                                    odpowiedzialność, aby pochować wszzelkie
                                    niebezpieczne lub wartościowe przedmioty.
                                    Identycznie wygląda sytuacja, gdy zwierzę
                                    przysporzy Ci nadprogramowych wydadtków
                                    związanych np. z dodatkowym sprzątaniem po
                                    zwierzęciu. To opiekun musi zadbać o
                                    właściwą ilość spacerów oraz ich
                                    częstotliwość. <br /> <br />
                                    Możesz prosić właściciela o dodatkowe
                                    rozliczenie, jednakże pamiętaj, że nie ma on
                                    obowiązku zwracać Ci pieniędzy za takie
                                    dodatkowe koszty.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        className="custom_span"
                                        component="span"
                                    >
                                        Co zrobić w sytuacji, gdy opiekunowi
                                        brakuje podstawowych rzeczy do
                                        zajmowania się podopiecznym?
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    To zależy od konretnej sytuacji. Jeżeli to
                                    włąściciele nie przekazali opiekunowi
                                    odpowiednich rzeczy do opieki, takich jak
                                    adekwatna ilość jedzenia, obroża, smycz,
                                    szelki, etc. należy jak najszybciej
                                    poinformować właściciela oraz wspólnie
                                    ustalić co należałoby dokupić i w jakiej
                                    ilości. <br /> <br /> Uwaga - wszelkie
                                    rozliczenia najlepiej wykonywać w trakcie
                                    trwania zlecenia/opieki albo przy odbiorze
                                    zwierzaka.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Col>
                </Row>
            </Container>
            <hr />
            <br />
            <Container className="text-center">
                <h5>Gdzie nas znaleść?</h5>
            </Container>{' '}
            <Container fluid="true" className="custom_Container">
                <Row className="custom_Row">
                    <Col xs={12} md={5} className="text-center" sm={3}>
                        <div
                            className="custom_Row"
                            style={{ alignItems: 'center' }}
                        >
                            <PlaceIcon
                                fontSize="large"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                }}
                            />
                            Pomorska 159, 90-236 Łódź
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="text-center">
                <h5>Dane kontaktowe</h5>
            </Container>{' '}
            <Container fluid="true" className="custom_Container">
                <Row className="custom_Row">
                    <Col xs={12} md={2} sm={3}>
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
                    <Col xs={12} md={2} className="text-center" sm={3}>
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

export default SupportPage;
