import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';

type TOrderDetailsContext = {
  optionCounts: TOptionCounts;
  totals: {
    cups: number;
    fragrances: number;
  };
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: TOptionType
  ) => void;
  resetOrder: () => void;
};

type TOptionCounts = {
  cups: { [key: string]: number }; // example: { Charcoal: 1, Cream: 2 }
  fragrances: { [key: string]: number }; // example: { Cedar: 1 }
};

type TOptionType = 'cups' | 'fragrances';

const OrderDetails = createContext<TOrderDetailsContext>({
  optionCounts: {
    cups: {},
    fragrances: {},
  },
  totals: {
    cups: 0,
    fragrances: 0,
  },
  updateItemCount: () => {},
  resetOrder: () => {},
});

// create custom hook to check whether we're in a provider
export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }
  return contextValue;
};

type TProps = {
  children: React.ReactNode;
};

export const OrderDetailsProvider = ({ children }: TProps) => {
  const [optionCounts, setOptionCounts] = useState<TOptionCounts>({
    cups: {}, // example: { Charcoal: 1, Cream: 2 }
    fragrances: {}, // example: { Cedar: 1 }
  });

  const updateItemCount = (
    itemName: string,
    newItemCount: number,
    optionType: TOptionType
  ) => {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // update the state with the updated copy
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({ cups: {}, fragrances: {} });
  };

  // utility function to derive totals from optionCounts state value
  const calculateTotal = (optionType: TOptionType) => {
    // get an array of counts for the option type (for example, [1, 2])
    const countsArray = Object.values(optionCounts[optionType]);

    // total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // multiply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    cups: calculateTotal('cups'),
    fragrances: calculateTotal('fragrances'),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return (
    <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
  );
};
