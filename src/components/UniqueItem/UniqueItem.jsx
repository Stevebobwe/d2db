import React from 'react';
import Affixes from '../Affixes/Affixes';

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
  // Start setting up actual layout and hook in images/base-item stats

  return (
    <li className='uniqueItem'>
      {invfileDisplay}
      <div className='itemName'>{name}</div>
      <div>{baseItemsData[code].name}</div>

      <br/><br/>

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
