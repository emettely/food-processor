import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import RecipeForm from "./components/RecipeForm";

const App = () => {
  return (
    <Box>
      <header>
        <Typography variant="h3">Cook a Noodle Too</Typography>
        <Typography variant="subtitle1">Optimise your cooking</Typography>
      </header>
      <RecipeForm />
    </Box>
  );
};

export default App;
