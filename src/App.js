import './scss/app.scss'
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';
import { useEffect, useState } from 'react';

// https://62e694a269bd03090f72e797.mockapi.io/items

function App() {

  const [items, SetItems] = useState([])

  useEffect(() => {
    fetch('https://62e694a269bd03090f72e797.mockapi.io/items')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        SetItems(json)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

