import axios from 'axios';
import { useEffect, useState } from 'react';

function MainPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:8080/BvJjyJz');
      console.log(res);
    })();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default MainPage;
