import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, Transaction, Shift } from '../types';

interface AppState {
  cart: CartItem[];
  currentShift: Shift | null;
  products: Product[];
  transactions: Transaction[];
  isLoading: boolean;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CURRENT_SHIFT'; payload: Shift | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  cart: [],
  currentShift: null,
  products: [],
  transactions: [],
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.product.price }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.payload.id,
            product: action.payload,
            quantity: 1,
            subtotal: action.payload.price,
          },
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity, subtotal: action.payload.quantity * item.product.price }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_CURRENT_SHIFT':
      return { ...state, currentShift: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};