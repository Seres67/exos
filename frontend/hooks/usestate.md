# useState

useState est un hook React pour stocker une donnée et recharger les composants quand cette donnée change.

Il y a une page dédiée à expliquer ce que c'est [ici](https://fr.react.dev/learn/state-a-components-memory).

```jsx
const Composant = () => {
  const [count, setCount] = useState(0); //NOTE: on défini une variable `count` à 0.

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Beep</button> <!-- NOTE: quand on clique sur le button, ajouter 1 à `count`  -->
    </>
  );
};
```
