import { PizzaBlock } from '../Components/pizza-block';
import Skeleton from '../Components/pizza-block/Skeleton';
import Sort, { sortList } from '../Components/Sort';
import { Categories } from '../Components/Categories';
import { Pagination } from '../Components/Pagination';

import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurentPage, setFilters } from '../redux/slices/filterSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

export const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const sortType = useSelector((state: any) => state.filter.sort.sortProperty);
  const curentPage = useSelector((state: any) => state.filter.curentPage);
  const searchValue = useSelector((state: any) => state.filter.searchValue);

  const { items, status } = useSelector((state: any) => state.pizza);

  const order = sortType.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangePage = (page: number) => {
    dispatch(setCurentPage(page));
  };

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const getPizzas = async () => {
    dispatch(
      //@ts-ignore
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        curentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // If there was a first rendering and parameters changed
  useEffect(() => {
    if (isMounted.current) {
      const queryStryng = qs.stringify({
        sortProperty: sortType,
        categoryId,
        curentPage,
      });
      navigate(`?${queryStryng}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, curentPage]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //If it is the first rendering, then check the URL and save it in Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // If there was a first rendering, then query
  useEffect(() => {
    getPizzas();

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, curentPage]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const pizzas = items.map((obj:any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeletons = [...new Array(9)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      <Pagination curentPage={curentPage} onChangePage={onChangePage} />
    </div>
  );
};
