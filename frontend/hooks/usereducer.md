# useReducer

set state -> dispatch -> run code & rerender

_Le code n'a pas été testé (bien qu'il devrait marcher)_

`Component.jsx`

```tsx
const Component = () => {
  const initialState = { count: 0 };

  //NOTE: création du `reducer`
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <>
      <button onClick={() => incrementCount(dispatch)}>Increment</button>
      <button onClick={() => decrementCount(dispatch)}>Decrement</button>
    </>
  );
};
```

`counter.reducer.js`

```js
//NOTE: reducer, qui gère les événements
const counterReducer = (state, action) => {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  } else if (action.type === "decrement") {
    return { count: state.count - 1 };
  }
};

const incrementCount = (dispatch) => {
  //NOTE: dispatch est la méthode pour envoyer des événements au reducer, elle vient du component
  return dispatch({ type: "increment" });
};

const decrementCount = (dispatch) => {
  return dispatch({ type: "decrement" });
};
```

L'exercice `Cart` du cours:

`Cart.js`

```js
import { useState } from "react";

//NOTE: reducer, qui gère les événements
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    state.push(action.value);
    return state;
  } else if (action.type === "REMOVE_ITEM") {
    return state.filter((book) => book.id !== action.id);
  } else if (action.type === "CLEAR_CART") {
    return [];
  }
};

const submitHandler = (e) => {
  e.preventDefault();
  return dispatch({
    type: "ADD_ITEM",
    value: { id: e.value.id, name: e.value.name },
  });
};

const inputValueHandler = (event, setValue) => setValue(event.target.value);

const removeItemHandler = (id) => {
  return dispatch({ type: "REMOVE_ITEM", id: id });
};

const clearCartHandler = () => {
  return dispatch({ type: "CLEAR_CART" });
};

const Cart = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const initialState = [];
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div
      style={{
        padding: "20px",
        border: "solid 1px",
        width: "300px",
      }}
    >
      <h2>Panier</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={id}
            onChange={(e) => inputValueHandler(e, setId)}
          />
          <input
            type="text"
            name="name"
            placeholder="NOM"
            value={name}
            onChange={(e) => inputValueHandler(e, setName)}
          />
        </div>

        <button type="submit">Ajouter un article</button>
      </form>

      <button onClick={clearCartHandler}>Vider le panier</button>

      <ul>
        {cart.map((item, index) => (
          <li key={item.id}>
            N°{item.id} : {item.name}{" "}
            <button onClick={() => removeItemHandler(id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
```

L'exercice `Form` du cours:

`Form.jsx`

```jsx
const Form = () => {
  const [submitted, setSubmitted] = useState(false);
  const initialState = {
    name: "",
    email: "",
    password: "",
    errors: {},
  };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const submitHandler = (e) => {
    e.preventDefault();
    return dispatch({ type: "VALIDATE" });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setValue("username", e.target.value);
        }
      />
      {state.errors.username && <p>{state.errors.username}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setValue("email", e.target.value);
        }
      />
      {state.errors.email && <p>{state.errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setValue("password", e.target.value);
        }
      />
      {state.errors.password && <p>{state.errors.password}</p>}

      <button type="submit">Submit</button>
      {submitted && <p>Inscription réussie!</p>}
    </form>
  );
};

export default Form;
```

`form.reducer.js`

```js
const formReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === "SET_FIELD") {
    newState[action.value.field] = action.value.value;
    return newState;
  } else if (action.type === "VALIDATE") {
    newState.errors = {};
    if (!state.username) {
      newState.errors.username = "Username empty.";
    }
    if (!state.email) {
      newState.errors.email = "Email empty.";
    }
    if (!state.password) {
      newState.errors.password = "Password empty.";
    }
    return newState;
  }
};

const setValue = (field, value) => {
  return dispatch({
    type: "SET_VALUE",
    value: { field: field, value: value },
  });
};
```
