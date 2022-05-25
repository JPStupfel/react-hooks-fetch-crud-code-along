import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
//import { set } from "msw/lib/types/context";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(()=>{
    fetch('http://localhost:4000/items').then(res=>res.json()).then(data=>setItems(data))
  },[])

  function handleDeleteItem(deletedItem) {
    setItems( items.filter(e=>e.id !== deletedItem)  );
  }

  function handleUpdateItem(updatedItem) {
    console.log("In ShoppingCart:", updatedItem);
    const updatedItems = items.map(e=> e.id===updatedItem.id ? updatedItem : e)
    setItems(updatedItems)
  }

  function onAddItem(newItem){
    setItems(items=>[...items, newItem])

  }
  
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm 
      handleAddItem={onAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
