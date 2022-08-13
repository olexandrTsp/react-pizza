import PizzaBlock from '../Components/pizza-block';
import Skeleton from '../Components/pizza-block/Skeleton';
import Sort from '../Components/Sort';
import Categories from '../Components/Categories';
import Pagination from '../Components/Pagination';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurentPage } from '../redux/slices/filterSlice';

export default function Home() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const curentPage = useSelector((state) => state.filter.curentPage);
  const dispach = useDispatch();

  const onChangeCategory = (id) => {
    dispach(setCategoryId(id));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, SetItems] = useState([]);
  const [isLoading, SetISLoading] = useState(true);

  const order = sortType.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangePage = (num) => {
    dispach(setCurentPage(num));
  };

  useEffect(() => {
    SetISLoading(true);

    axios
      .get(
        `https://62e694a269bd03090f72e797.mockapi.io/items?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        SetItems(res.data);
        SetISLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, curentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination curentPage={curentPage} onChangePage={onChangePage} />
    </div>
  );
}
