'use client';

import config from '@/config';
import { useOrderDetails } from '@/contexts/OrderDetails';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type TOrderPhase = 'inProgress' | 'review' | 'completed';

type TProps = {
  setOrderPhase: (orderPhase: TOrderPhase) => void;
};

function OrderConfirmation({ setOrderPhase }: TProps) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Authorization POST request

    const dataAuth = {
      identifier: process.env.NEXT_PUBLIC_CLIENT_IDENTIFIER,
      password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
    };

    axios
      .post(`${config.api}/api/auth/local`, dataAuth)
      .then(response => setToken(response.data.jwt))
      .catch(error => {
        console.log(error);
        // @todo - handle error here
      });
  }, []);

  useEffect(() => {
    // Order POST Request
    if (token !== null) {
      const headersOrder = {
        Authorization: `Bearer ${token}`,
      };

      const dataOrder = {
        data: {
          cup: 'Test',
          fragrance: ['Cedar', 'Coconut'],
          amount: 15,
        },
      };

      axios
        .post(`${config.api}/api/orders`, dataOrder, {
          headers: headersOrder,
        })
        .then(response => setOrderNumber(response.data.data.id))
        .catch(error => {
          console.log(error);
          // @todo - handle error here
        });
    }
  }, [token]);

  function handleNewEnter() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase('inProgress');
    router.push('/entry');
  }

  function handleHome() {
    router.push('/');
  }

  if (orderNumber) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center p-16">
        <h1 className="text-5xl">Thank You!</h1>
        <p>Your order number is #{orderNumber}</p>
        <p className="max-w-2xl text-center">
          Thank you for choosing Candle Enchantment to add a touch of
          enchantment to your space! Your custom candle order is confirmed, and
          we are thrilled to craft the perfect ambiance for your home or special
          occasion.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleNewEnter}
            className="btn btn-active btn-accent"
          >
            Create new order
          </button>
          <button onClick={handleHome} className="btn btn-outline">
            Home
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center gap-2 items-center pt-48">
        <p>Loading</p>
        <p className="loading loading-dots loading-lg"></p>
      </div>
    );
  }
}

export default OrderConfirmation;
