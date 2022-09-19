import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";
import Scoped from "../apis/Scoped";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

const RestaurantDetail = () => {
  const { id } = useParams(); //in order to retrieve the id of the selected restaurant only in the fetch later
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext); //destructuring selectedRestaurant and setSelectedRestaurant from RestaurantContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Scoped.get(`/${id}`);
        console.log(response);

        setSelectedRestaurant(response.data.data); //using setselectedrestaurant from context to change its initial state of null to response.data.data
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); //call fetch outside of function
  }, []);

  return (
    <div>
      {selectedRestaurant && ( //if there  is a selectedRestaurant, return JSX below
        <>
          <h1 //h1 at top of the selected restaurants name
            style={{ fontFamily: "Myriad Pro Regular" }}
            className="text-center display-1"
          >
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count //
                ? `(${selectedRestaurant.restaurant.count})`
                : "0"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetail;
