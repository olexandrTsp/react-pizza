import PizzaBlock from '../Components/pizza-block';
import Skeleton from '../Components/pizza-block/Skeleton';
import Sort from '../Components/Sort';
import Categories from '../Components/Categories';

import { useEffect, useState } from 'react';

export default function Home() {
  const [items, SetItems] = useState([]);
  const [isLoading, SetISLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    SetISLoading(true);
	 
    fetch('https://62e694a269bd03090f72e797.mockapi.io/items?category=' + categoryId)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        SetItems(json);
        SetISLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}
