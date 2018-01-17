import React from 'react';
import ReactDOM from 'react-dom';


const Otsikko = (props) => {
  return (
      <div>
        <h1> Kurssi:  {props.kurssi}</h1>
      </div>
    )
}

const Osa = (props) => {
  return (
    <div>
      <p> {props.osa} {props.tehtavia} </p>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.osa1.nimi} tehtavia={props.osa1.tehtavia} />
      <Osa osa={props.osa2.nimi} tehtavia={props.osa2.tehtavia} />
      <Osa osa={props.osa3.nimi} tehtavia={props.osa3.tehtavia} />
    </div>
  )

}
const Yhteensa = (props) => {
  return (
    <div>
      <p> yhteensä {props.tehtavia1 + props.tehtavia2 + props.tehtavia3} </p>
    </div>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  /*const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedon välitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14*/
  /*const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }*/
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osat[0]} osa2={osat[1]} osa3={osat[2]}/>
      <Yhteensa tehtavia1={osat[0].tehtavia} tehtavia2={osat[1].tehtavia} tehtavia3={osat[2].tehtavia}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
