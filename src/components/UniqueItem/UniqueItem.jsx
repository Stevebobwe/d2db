import React from 'react';
import Affixes from '../Affixes/Affixes';

function UniqueItem(props) {
  const { name, enabled, ladder, code, rarity, ilvl, rlvl, costmulti, affixes } = props;

  return (
    <li className='uniqueItem'>
      <div>Name: {name}</div>
      <div>Enabled: {enabled.toString()}</div>
      <div>Ladder: {ladder.toString()}</div>
      <div>Code: {code}</div>
      <div>Rarity: {rarity}</div>
      <div>ilvl: {ilvl}</div>
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