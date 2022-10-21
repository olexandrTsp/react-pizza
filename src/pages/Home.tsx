import { PizzaBlock } from '../Components/pizza-block';
import Skeleton from '../Components/pizza-block/Skeleton';
import Sort, { sortList } from '../Components/Sort';
import { Categories } from '../Components/Categories';
import { Pagination } from '../Components/Pagination';

import qs from 'qs';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurentPage, setFilters } from '../redux/slices/filterSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import { SearchPizzaParams } from '../redux/slices/pizzaSlice';
export const Home: React.FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        curentPage: String(curentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // If there was a first rendering and parameters changed
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryStryng = qs.stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       curentPage,
  //     });
  //     navigate(`?${queryStryng}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, curentPage]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //If it is the first rendering, then check the URL and save it in Redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         curentPage: Number(params.curentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );

  //     isSearch.current = true;
  //   }
  // }, []);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // If there was a first rendering, then query
  useEffect(() => {
    getPizzas();

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, curentPage]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
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
