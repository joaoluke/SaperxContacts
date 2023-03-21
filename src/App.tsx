import { useState } from "react";
import Card from '@mui/material/Card';

import { ToolbarMenu } from "./components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ToolbarMenu />
      <Card sx={{ minWidth: 275 }}>

      </Card>
    </div>
  );
}

export default App;
