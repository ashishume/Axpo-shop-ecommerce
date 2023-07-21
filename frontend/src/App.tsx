import { useAppDispatch, useAppSelector } from "./store/hooks";
import { decrement, fetchProducts, increment, incrementByAmount } from "./store/slices/counterSlice";
function App() {
  const counter = useAppSelector((state) => state.counterSlice.value);
  const dispatch = useAppDispatch();
  console.log(counter);
  return (
    <div className="App">
      {/* <h1>Counter: {counter.map((v) => (v as any).name as any)}</h1> */}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(fetchProducts())}>Update</button>
    </div>
  );
}

export default App;
