import './scss/app.scss'
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/pizza-block';
import { useEffect, useState } from 'react';
import Skeleton from './Components/pizza-block/Skeleton';


// https://62e694a269bd03090f72e797.mockapi.io/items

function App() {

  const [items, SetItems] = useState([])
  const [isLoading, SetISLoading] = useState(true)

  useEffect(() => {
    fetch('https://62e694a269bd03090f72e797.mockapi.io/items')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        SetItems(json)
        SetISLoading(false)
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
            {
              isLoading ? [...new Array(10).map(() => <Skeleton />) : items]
           }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// {items.map((obj) => {
//   return <PizzaBlock key={obj.id} {...obj} />
// })}