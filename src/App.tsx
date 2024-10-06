import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-center">
        Hello world!
      </h1>
      <div className="card">
        <Button icon="pi pi-plus" className="mr-2" label="Increment" onClick={() => setCount((count) => count + 1)}></Button>
        <InputText value={count.toString()} />
      </div>
    </>
  );
}

export default App;