import React from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import Affixes from '../Affixes/Affixes';
import './UniqueItem.scss';

function UniqueItem(props) {
  const { name, enabled, ladder, code, rarity, ilvl, rlvl, costmulti, affixes, invfile, baseItemsData } = props;

  // used for choosing a random invfile from the invfile arrays
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // display item invfile image
  let invfileDisplay;
  let randomInvFileIndex;
  if (invfile) {
    if (typeof invfile === 'string') {
      // display invfile from uniqueItems.json
      invfileDisplay = <img src={`images/invfile/${invfile}.gif`} alt='invfile'/>
    }
    else {
      // display random invfile inside invfile array from uniqueItems.json
      randomInvFileIndex = getRandomInt(0, invfile.length - 1);
      invfileDisplay = <img src={`images/invfile/${invfile[`${randomInvFileIndex}`]}.gif`} alt='invfile'/>
    }
  }
  else if (baseItemsData[code].invfile) {
    if (typeof baseItemsData[code].invfile === 'string') {
      // display invfile from baseItems.json
      invfileDisplay = <img src={`images/invfile/${baseItemsData[code].invfile}.gif`} alt='invfile'/>
    }
    else {
      // display random invfile inside invfile array from baseItems.json
      randomInvFileIndex = getRandomInt(0, baseItemsData[code].invfile.length - 1);
      invfileDisplay = <img src={`images/invfile/${baseItemsData[code].invfile[`${randomInvFileIndex}`]}.gif`} alt='invfile'/>
    }
  }

  // display quality level of item from baseItems.json or default to 1
  let qlvlIfDefined;
  if (baseItemsData[code].qlvl) {
    qlvlIfDefined = <div>Quality Level: {baseItemsData[code].qlvl}</div>;
  }
  else {
    qlvlIfDefined = <div>Quality Level: 1</div>;
  }

  // display magic level of item from baseItems.json or default to 1
  let mlvlIfDefined;
  if (baseItemsData[code].mlvl) {
    mlvlIfDefined = <div>Magic Level: {baseItemsData[code].mlvl}</div>;
  }

  // display durability of item from baseItems.json or default to 1
  let durIfDefined;
  if (baseItemsData[code].dur) {
    durIfDefined = <div>Durability: {baseItemsData[code].dur}</div>;
  }

  // display durability of item from baseItems.json or default to 1
  let acIfDefined;
  if (baseItemsData[code].ac) {
    acIfDefined = <div>Base Defense: {baseItemsData[code].ac.min}-{baseItemsData[code].ac.max}</div>;
  }





  // display if item is ladder-only
  let ladderOnly;
  if (ladder === true) {
    ladderOnly = <div>(Ladder Only)</div>;
  }

  console.log('testingnow');
  console.log(affixes);
  // Start setting up actual layout and hook in images/base-item stats

  return (
    <li className='uniqueItem'>

      <div className='itemDisplay'>
        {invfileDisplay}
        <div className='itemName'>{name}</div>
        <div>{baseItemsData[code].name}</div>
      </div>
      <div>
        <div>Item Level: {ilvl}</div>
        {/* {mlvlIfDefined} */}
        {qlvlIfDefined}
        <div>Required Level: {rlvl}</div>

        {acIfDefined}

        {durIfDefined}
        <Affixes itemAffixes={affixes} rlvl={rlvl} />
        <div>{ladderOnly}</div>
      </div>
    </li>
  );
}

export default UniqueItem;
