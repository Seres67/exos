# Redux

Même principe que `useReducer`.

`react-redux`: lib spéciale pour utiliser `redux` avec `react`.

Installer `redux` et `react-redux`:
`npm install @reduxjs/toolkit react-redux`

# Création du store

`./store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({});

export default store;
```

# Création d'une slice `counter`

`./store/counterSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

Mise à jour du store pour prendre en compte le compteur:

`./store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: counterReducer,
});

export default store;
```

# Utilisation de `counterReducer`

`./components/Counter.jsx`

```jsx
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../store/counterSlice";

const Counter = () => {
  const counter = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const incrementHandler = () => {
    return dispatch(increment());
  };

  const decrementHandler = () => {
    return dispatch(decrement());
  };

  return (
    <div>
      <h1>Compteur: {counter}</h1>
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </div>
  );
};

export default Counter;
```

# Gestion de plusieurs slices

`./store/index.js`

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer, //NOTE: il n'existe pas, mais c'est un exemple
  },
});

export default store;
```

# Envoi d'actions

Exemple pour incrémenter, avec le `counter` plus haut:

```js
import { increment } from "../store/counterSlice";

dispatch(increment());
```

Exemple avec `user` (qui n'existe pas!):

```js
dispatch(addUser({ name: "test", age: 99 }));
```
