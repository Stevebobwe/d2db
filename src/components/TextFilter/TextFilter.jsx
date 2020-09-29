import React, { useState, useEffect } from 'react';
import UniqueItemsData from '../../data/uniqueItems.json';
import UniqueItem from '../UniqueItem/UniqueItem';

function TextFilter() {
  const [textFilter, setTextFilter] = useState('');
  const [filteredUniqueItemsData, setFilteredUniqueItemsData] = useState(UniqueItemsData);

  console.log('UniqueItemsData');
  console.log(UniqueItemsData);
  console.log('filteredUniqueItemsData');
  console.log(filteredUniqueItemsData);

  const itemList = filteredUniqueItemsData
    .filter(item => {
      // remove items whose names do not contain filter text
      return item.name.toLowerCase().indexOf(textFilter.toLowerCase()) >= 0
    })
    .map(item => {
      return <UniqueItem {...item} />;
  });

  return (
    <div>
      <form>
        <input type="text" placeholder="Search..." onChange={ e => setTextFilter(e.target.value) }/>
        <p>Filter = "{textFilter}"</p>
      </form>

      <ul className='uniqueItemList'>
        {itemList}
      </ul>
    </div>
  );
}

export default TextFilter;
