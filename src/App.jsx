import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: 8
  }
}));

const RecipeForm = () => {
  const classes = useStyles();
  const [form, setForm] = useState();

  const handleChange = event => {
    setForm(event.target.value);
    console.log(form);
  };

  const handleSubmit = event => {
    //Make a network call somewhere
    event.preventDefault();
    console.log(event);
  };

  return (
    <Container>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          label="Recipe name"
          id="standard-required"
          fullWidth
          placeholder="Recipe 1"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          fullWidth
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <header>
        <Typography variant="h3">Cook a Noodle Too</Typography>
        <Typography variant="subtitle1">Optimise your cooking</Typography>
      </header>
      <RecipeForm />
    </Box>
  );
};

export default App;
