import PizzaBlock from '../Components/pizza-block';
import Skeleton from '../Components/pizza-block/Skeleton';
import Sort from '../Components/Sort';
import Categories from '../Components/Categories';

import { useEffect, useState } from 'react';

export default function Home() {


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
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? [...new Array(9)].map((_, i) => <Skeleton key={i} />)
						: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
				}
			</div>
		</>
	)
}

