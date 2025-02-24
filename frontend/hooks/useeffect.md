# useEffect

useEffect est un hook React pour executer du code quand un state change.

Il y a une page dédiée à expliquer ce que c'est [ici](https://fr.react.dev/learn/synchronizing-with-effects).

```jsx
const Composant = () => {
  const [count, setCount] = useState(0); //NOTE: on défini une variable `count` à 0.

    useEffect(() => {
        console.log(count);
    }, [count]); //NOTE: on relance ce code seulement quand `count` change.

    useEffect(() => {

    }, []); //NOTE: ici, on exécute ce code seulement au premier chargement, utile pour récupérer des données d'une API par ex.

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Beep</button> <!-- NOTE: quand on clique sur le button, `count` devrait s'afficher dans la console.  -->
    </>
  );
};
```

## Ressources

- [Vous n’avez pas forcément besoin d’un Effet](https://fr.react.dev/learn/you-might-not-need-an-effect)
- [(vidéo) Goodbye, useEffect](https://www.youtube.com/watch?v=bGzanfKVFeU)
