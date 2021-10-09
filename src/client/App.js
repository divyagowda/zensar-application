import React,{useState,useEffect} from 'react';
import './App.css';
import {getItems,searchItems} from './services/service';
import Header from './components/header';
import Menuitems from './components/menuitems';
import Sidebar from './components/sidebar';


export default () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dietaries, setDietaries] = useState([]);
  const [dietCount, setDietCount] = useState({});

  useEffect(async() => {
    async function fetchData() {
      const itemList = await getItems();
      //console.log("item "+JSON.stringify(itemList));
      setItems(itemList.items);
      itemList.items.forEach(element => dietaries.push(...element.dietaries))
      setDietaries(Array.from(new Set(dietaries)))
    }
    fetchData();
    return () => {
      setItems([])
      setDietaries([])
      setDietCount({})
    }
  }, [])

  const itemClickHandler = (item) => {
   
    console.log(JSON.stringify(selectedItems)+''+JSON.stringify(item))
    
    let itemPresent = selectedItems.length ? selectedItems.findIndex(selectedItem => selectedItem.id === item.id) : -1;
    console.log('itemPresent    '+itemPresent)
    if(itemPresent < 0){
      selectedItems.push(item)
      setSelectedItems([...selectedItems])
      calculateDietaries()
    }
    
  }

  const calculateDietaries = () => {
    let dietaryCount = {};
    selectedItems && selectedItems.forEach(item => {
      item.dietaries && item.dietaries.forEach(element => {
        dietaryCount[element] = (dietaryCount[element] || 0) + 1;
      });
    })
    console.log(dietaryCount)
    setDietCount(dietaryCount);
    //return dietaryCount;
  }

  const removeSelectedItem = (e, item) => {
    e.preventDefault();
    const tempArray = [...selectedItems]
    const index = tempArray.findIndex(element => element.id === item.id)
    tempArray.splice(index,1)
    //console.log();
    if(index > -1)
      setSelectedItems([...tempArray])
  }

  const searchHandler = async(e) => {
    const itemList = await searchItems(e.target.value);
    setItems(itemList.items);
  }

  return ( 

    <div className="wrapper">
      {/* Header component having selected item count and also the dietary count */}
      <Header selectedItems={selectedItems} dietCount={dietCount} />

      <div className="container menu-builder">
        <div className="row">
          {/* Side bar containing all the menuitems with filter option */}
          <Sidebar items={items} searchHandler={searchHandler} itemClickHandler={itemClickHandler}/>
          {/* This section contains main items which are selected by the user */}
          <Menuitems selectedItems={selectedItems} removeSelectedItem={removeSelectedItem} />
        </div>
      </div>
    </div>
  )
};
