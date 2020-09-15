import React from 'react';
import UniqueItemsData from '../../data/uniqueItems.json';
import UniqueItem from '../UniqueItem/UniqueItem';
import './UniqueItemList.scss';

function UniqueItemList() {
  const uniqueItemList = UniqueItemsData.map((item) => {
    return <UniqueItem {...item} />;
  });

  return (
    <ul className='uniqueItemList'>
      {uniqueItemList}
    </ul>
  );
}

export default UniqueItemList;
