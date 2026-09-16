import { decrement, decrementByNumber, defaultValue, getCount, increment, incrementByNumber } from '../store/counter';
import { useAppDispatch, useAppSelector } from '../hooks';
import heroImg from '../assets/hero.png';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

const CounterPage = () => {
   const count = useAppSelector(getCount);
   const dispatch = useAppDispatch();

   const handleIncrement = () => dispatch(increment());
   const handleDecrement = () => dispatch(decrement());
   const handleDefaultValue = () => dispatch(defaultValue());
   const handleIncrementByNumber = () => dispatch(incrementByNumber(5));
   const handleDecrementByNumber = () => dispatch(decrementByNumber(2));

   return (
      <>
         <section id="center">
            <div className="hero">
               <img src={heroImg} className="base" width="170" height="179" alt="" />
               <img src={reactLogo} className="framework" alt="React logo" />
               <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
               <h1>Get started</h1>
               <p>
                  Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
               </p>
            </div>
            <div>
               <div className="flex items-center gap-3">
                  <button type="button" className="counter" onClick={handleIncrement}>
                     Увеличить
                  </button>
                  <p>{count}</p>
                  <button type="button" className="counter" onClick={handleDecrement}>
                     Уменьшить
                  </button>
               </div>
               <div className="mt-4 flex flex-col gap-2">
                  <button type="button" className="counter" onClick={handleDefaultValue}>
                     Значение по умолчанию
                  </button>
                  <button type="button" className="counter" onClick={handleIncrementByNumber}>
                     Увеличить число на 5
                  </button>
                  <button type="button" className="counter" onClick={handleDecrementByNumber}>
                     Уменьшить число на 2
                  </button>
               </div>
            </div>
         </section>
      </>
   );
};

export default CounterPage;
