import React from "react";
import { useEffect, useContext } from "react";
import Scoped from "../apis/Scoped"; //importing axios baseURL fetch from Scoped api file to use here and make shorter url fetches
import { RestaurantContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  //pass props to use from context
  const { restaurants, setRestaurants } = useContext(RestaurantContext); //destructure {} restaurants/setrestaurants from RestaurantContext context.

  //   let history = useHistory("");

  useEffect(() => {
    const fetchData = async () => {
      //useEffect has to return a function so put trycatch inside of one then async/await that function
      try {
        const response = await Scoped.get("/"); //await fetching the '/' or 'get all' url request, then SETrestaurants to that retrieved data.
        setRestaurants(response.data.data.restaurants);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); //call function at end
  }, []); //empty array to only call one time, on page load/mount

  const handleDelete = async (e, id) => {
    e.stopPropagation(); //pass in event object for stopPropagation which allows you to select buttons that are on a row that also has an onclick. the buttons onClick will fire without ever calling the rows onclick event

    //pass in id of specific restaurant to delet
    const response = await Scoped.delete(`/${id}`); //dynamically deleting the selected ID using template literal
    setRestaurants(
      restaurants.filter((restaurant) => {
        return restaurant.id !== id; //when restaurant.id does NOT equal the id of the deleted restaurant then it is added back into the array. if it does equal then its removed from array.
      })
    );
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    window.location = `/restaurants/${id}/update`;
  };

  const handleRestaurantSelect = (id) => {
    window.location = `/restaurants/${id}`;
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && //if restaurants exist then run rest of code or if not then dont
            restaurants.map((restaurant) => {
              //map over each restaurant and render the jsx for each one
              return (
                //return jsx on maps and give unique key of id. '$'.repeat(hardcode a number of times to repeat the $ OR reference restaurant.price_range for dynamic amount)
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)} //has to be in arrow function or else it will run right away. we only want it to run when clicked
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
