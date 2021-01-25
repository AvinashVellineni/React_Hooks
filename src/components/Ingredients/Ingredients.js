import React, { useState, useEffect } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch(
      'https://react-hooks-ba854-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(data => {
        return data.json();
      })
      .then(responseData => {
        let loadedIngredients = [];
        for (let key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);
  const addIngredientHandler = ingredient => {
    fetch(
      'https://react-hooks-ba854-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={() => {}}
      ></IngredientList>
      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
