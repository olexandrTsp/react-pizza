import PizzaBlock from '../Components/pizza-block';
import Skeleton from '../Components/pizza-block/Skeleton';
import Sort from '../Components/Sort';
import Categories from '../Components/Categories';

import { useEffect, useState } from 'react';

export default function Home({ searchValue }) {
  const [items, SetItems] = useState([]);
  const [isLoading, SetISLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';

  useEffect(() => {
    SetISLoading(true);

    fetch(
      `https://62e694a269bd03090f72e797.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        SetItems(json);
        SetISLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) return true;

      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
}
