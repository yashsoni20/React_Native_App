import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Userinsider = () => {
  const [myData, setMyData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${base_url}Users`)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (_id) => {
    axios.delete(`${base_url}Users/${_id}`)
      .then(response => {
        setData(data.filter(item => item._id !== _id));
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };

  // const fetchData = async () => {
  //   // Fetch data from API and set it to myData
  //   const response = await fetch("${base_url}Users");
  //   const data = await response.json();
  //   setMyData(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleRefresh = () => {
  //   fetchData();
  // };
  // const ChangeAdmin = () => {
  //   axios.put(`${base_url}Users/isAdmin/${item._id}`);
  // };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDelete(item._id)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default Userinsider;
