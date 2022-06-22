import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantsContext";
import Scoped from "../apis/Scoped";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Scoped.get(`/${id}`);
        console.log(response);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
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
