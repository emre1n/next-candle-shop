import { createContext, useContext, useState } from 'react';

interface OrderDetailsContextType {
  cup: { [cupName: string]: number }[];
  fragrances: { [fragranceName: string]: number }[];
}

const OrderDetails = createContext<OrderDetailsContextType | null>(null);

// Purpose of the custom hook: Create custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }

  return contextValue;
}

interface OrderDetailsProviderProps {}

export function OrderDetailsProvider(Props: OrderDetailsProviderProps) {
  const [optionDetails, setOptionDetails] = useState<OrderDetailsContextType>({
    cup: [], // example: [{'Charcoal': 10}]
    fragrances: [], // example: [{'Cedar': 5}, {'Coconut': 5}]
  });

  function updateItemDetails(
    newItemDetails: { [itemName: string]: number }[],
    optionType: 'cup' | 'fragrances'
  ) {
    // make a copy of existing state
    const newOptionDetails = { ...optionDetails };

    // update the copy with the new information
    newOptionDetails[optionType] = newItemDetails;

    // update the state with the updated copy
    setOptionDetails(newOptionDetails);
  }

  function resetOrder() {
    setOptionDetails({
      cup: [], // example: ['Charcoal']
      fragrances: [], // example: ['Cedar', 'Coconut']
    });
  }

  // utility function to derive totals from optionCounts state value
  function calculateTotal(optionType: 'cup' | 'fragrances') {
    if (optionType === 'cup') {
      return itemPrice;
    } else if (optionType === 'fragrances') {
      return optionDetails.fragrances.length * itemPrice;
    }
  }

  const totals = {
    cup: calculateTotal('cup'),
    fragrances: calculateTotal('fragrances'),
  };

  interface ValueType extends OrderDetailsContextType {
    updateItemDetails: (
      newItemDetails: string[],
      optionType: 'cup' | 'fragrances'
    ) => void;
    resetOrder: () => void;
    totals: typeof totals;
  }

  const value: ValueType = {
    cup: optionDetails.cup,
    fragrances: optionDetails.fragrances,
    totals,
    updateItemDetails,
    resetOrder,
  };

  return <OrderDetails.Provider value={value} {...Props} />;
}
