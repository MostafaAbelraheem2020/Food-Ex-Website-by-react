import { useParams } from "react-router-dom";
import { useContext } from "react";
import MyContext from "./MainDataContext";
function MealDesc() {
  const { meals } = useContext(MyContext);

  const { id } = useParams();
  const selectedMeal = meals.find((item) => item.id === parseInt(id));
  console.log(selectedMeal);
  return (
    <div>
      {selectedMeal ? (
        <div>
          <h1>{selectedMeal.name}</h1>
          <p>{selectedMeal.description}</p>
          <p>Price: ${selectedMeal.price}</p>
          <p>Rating: {selectedMeal.rate} ⭐</p>
          <img
            style={{ maxWidth: "50%", maxHeight: "50%", borderRadius: "10px" }}
            src={selectedMeal.img}
            alt={selectedMeal.name}
          />
        </div>
      ) : (
        <p>Meal not found</p>
      )}
    </div>
  );
}

export default MealDesc;
