import Input from "./components/UI/Input";
import Button from "./components/UI/Button";
import Form, { FormHandle } from "./components/UI/Form";
import { useRef } from "react";
import React from "react";

function App() {
  const customForm = useRef<FormHandle>(null);

//   const test = useRef<HTMLInputElement>(null);
  function handleSave(data: unknown) {
    // values inserted into inputs are always of type string (ever if the input type is number)
    const extractedData = data as { name: string; age: string };
    console.log(extractedData);
    customForm.current?.clear();
  }

  return (
    <main>
      {/* <Container as={Button}>Click me</Container> */}
      {/* <Input label="test" id="test" ref={test} /> */}

      <Form onSave={handleSave} ref={customForm}>
        <Input type="text" label="Name" id="name" name="name" />
        <Input type="number" label="Age" id="age" name="age" />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
