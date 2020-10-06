import React from 'react';
import Affixes from '../Affixes/Affixes';

function UniqueItem(props) {
  const { name, enabled, ladder, code, rarity, ilvl, rlvl, costmulti, affixes, baseItemsData } = props;

  // let qlvlIfDefined;
  // if (qlvl) {
  //   qlvlIfDefined = <div>qlvl: {qlvl}</div>;
  // }

  let qlvlIfDefined;
  if (baseItemsData[code].qlvl) {
    qlvlIfDefined = <div>qlvl: {baseItemsData[code].qlvl}</div>;
  }
  else {
    qlvlIfDefined = <div>qlvl: 1</div>;
  }


  console.log('testingnow');
  console.log(code);
  console.log(baseItemsData);
  console.log(baseItemsData[code]);
  console.log(baseItemsData[code].name);



  return (
    <li className='uniqueItem'>
      <div>Name: {name}</div>
      <div>Enabled: {enabled.toString()}</div>
      <div>Ladder: {ladder.toString()}</div>
      <div>Code: {code}</div>
      <div>Rarity: {rarity}</div>
      <div>ilvl: {ilvl}</div>
      {qlvlIfDefined}
      <div>rlvl: {rlvl}</div>
      <div>costmulti: {costmulti}</div>
      <div>
        <div>affixes:</div>
        <Affixes itemAffixes={affixes} rlvl={rlvl} />
      </div>
    </li>
  );
}

export default UniqueItem;
