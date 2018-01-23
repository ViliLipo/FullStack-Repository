import React from 'react';

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko nimi={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
      <div>
        <h1> Kurssi:  {props.nimi}</h1>
      </div>
    )
}

const Osa = (props) => {
  return (
    <div>
      <p> {props.osa.nimi} {props.osa.tehtavia} </p>
    </div>
  )
}

const Sisalto = (props) => {
  const rivit = () => props.osat.map(osa => <Osa key={osa.id} osa={osa}/>)
  return (
    <div>
      {rivit()}
    </div>
  )

}
const Yhteensa = (props) => {
  let sum = props.osat.map(osa => osa.tehtavia).reduce((a,b) => a + b, 0)
  return (
    <div>
      <p> Yhteensä {sum} tehtävää </p>
    </div>
  )
}

export default Kurssi
