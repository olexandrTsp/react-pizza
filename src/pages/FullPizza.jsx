import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FullPizza() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [pizza, setPizza] = useState();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62e694a269bd03090f72e797.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Data error');
        navigate('/')
      }
    }

    fetchPizza();
  }, []);

  if (pizza) {
    return (
      <div className="container">
        <img src={pizza.imageUrl} alt="" />
        <h2>{pizza.title}</h2>

        <h4> Цена: {pizza.price}</h4>
      </div>
    );
  } else {
    return 'Loading...';
  }
}
