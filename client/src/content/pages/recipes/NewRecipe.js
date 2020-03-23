// Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function NewRecipe(props) {
  // Declare and initialize state variables
  let [newRecipe, setNewRecipe] = useState({});
  let [message, setMessage] = useState("");
  let [title, setTitle] = useState('')
  let [alt, setAlt] = useState('')
  let [userId, setUserId] = useState('')
  let [image, setImage] = useState('')
  let [servings, setServings] = useState(0)
  let [description, setDescription] = useState("");
  let [directions, setDirections] = useState("");
  let [ingredients, setIngredients] = useState("");
  let [date, setDate] = useState("");
  let [tags, setTags] = useState("");

  let redirect = "";

  useEffect(()=> {
    setMessage("");
  }, [title, alt, userId, image, servings, directions, ingredients, date, tags])

  const handleSubmit = e => {
    e.preventDefault()
    setUserId(props.user._id);
    console.log("I'M WORKING", props.user._id, userId);
    // TODO: Send the user sign up data to the server
    fetch(`${process.env.REACT_APP_SERVER_URL}/recipes/`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        alt,
        userId,
        image,
        servings,
        directions,
        ingredients,
        date,
        tags
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        console.log(response);
        setMessage(`${response.status}: ${response.statusText}`);
        return;
      }
      //if worked
      redirect =  (<Redirect to={`${process.env.REACT_APP_SERVER_URL}/recipes`} />);
    })
  }

  if (!props.user) {
    return <Redirect to='/' />
  } 


  return (
    <div>
      <h2>New Recipe</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Alt tag:</label>
          <input type="text" name="alt" onChange={e => setAlt(e.target.value)} />
        </div>
        <div>
          <label>Image url:</label>
          <input type="url" name="image" onChange={e => setImage(e.target.value)} />
        </div>
        <div>
          <label>Servings:</label>
          <input type="number" name="servings" onChange={e => setServings(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" placeholder="Explain your recipe in 280 characters or less..." onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Directions:</label>
          <input type="text" name="directions" placeholder="Comma-seperate your list of directions..." onChange={e => setDirections(e.target.value)} />
        </div>
        <div>
          <label>Ingredients:</label>
          <input type="text" name="ingredients" placeholder="Comma-separate your list of ingredients..." onChange={e => setIngredients(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="text" name="date" onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label>Tags:</label>
          <input type="text" name="tags" placeholder="Comma-separate your list of tags, the more the better!" onChange={e => setTags(e.target.value)} />
        </div>
        <button type="submit">Create Recipe!</button>
      </form>
      {redirect}
    </div>
  )
}