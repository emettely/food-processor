import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const RecipeForm = () => {
  const [form, setForm] = useState();
  const [recipe, setRecipe] = useState();
  const [message, setMessage] = useState("");

  const handleChange = event => {
    setForm(event.target.value);
  };

  const getRecipe = async () => {
    try {
      const response = await fetch("http://localhost:5000", {
        method: "post",
        mode: "cors",
        header: { "Access-Control-Allow-Origin": "*" },
        body: { url: form }
      });
      console.log(response);

      return await response.json();
    } catch (e) {
      console.error(e);
      setMessage("Failed to get recipe from URL");
    }
  };

  const handleSubmit = event => {
    console.log(event);
    setRecipe(getRecipe());
    // Make a network call somewhere
  };

  return (
    <Container>
      <p>{message}</p>
      <form noValidate autoComplete="off">
        <TextField
          label="URL"
          fullWidth
          margin="normal"
          defaultValue="https://www.theguardian.com/food/2019/nov/29/anna-jones-squash-recipes-caponata-pancakes"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          label="Submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
      {form}
      {recipe}
    </Container>
  );
};

export default RecipeForm;
