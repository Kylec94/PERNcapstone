import React from "react";
import { useState, useContext } from "react";
import Scoped from "../apis/Scoped";
import { RestaurantContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantContext); //destructure addRestaurants context
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const handleSubmit = async (e) => {
    //pass in e for event for clicks or submits
    e.preventDefault(); //keeps page from refreshing when u submit

    try {
      const response = await Scoped.post("/", {
        name: name, //if back end and front end naming conventions are the same u could just leave it as 'name' and 'location'
        location: location,
        price_range: priceRange, //back end expects price_range front end is using useState for priceRange. priceRange is the useState
      });
      setName("");
      setLocation("");
      setPriceRange("Price Range");
      addRestaurants(response.data.data.restaurant);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name} //useState value
              onChange={(e) => setName(e.target.value)} //useState is changed via this onChange
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange} //
              onChange={(e) => setPriceRange(e.target.value)}
              className="custom-select"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
