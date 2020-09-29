import React from 'react';
import UniqueItemsData from '../../data/uniqueItems.json';
import UniqueItem from '../UniqueItem/UniqueItem';
import './UniqueItemList.scss';

function UniqueItemList() {
  const uniqueItemList = UniqueItemsData.map(item => {
    return <UniqueItem {...item} />;
  });


  // WIP BELOW
  // const filteredUniqueItemList = UniqueItemsData
  //   .filter(name => {
  //     // remove items whose names do not contain filter text
  //   })
  //   .map(item => {
  //     return <UniqueItem {...item} />;
  //   });
  
  // WIP ABOVE

  return (
    <ul className='uniqueItemList'>
      {uniqueItemList}
    </ul>
  );
}

export default UniqueItemList;
