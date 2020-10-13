import React, { useState } from 'react';
import Affixes from '../Affixes/Affixes';
import './UniqueItem.scss';

function UniqueItem(props) {
  const { name, enabled, ladder, code, rarity, ilvl, rlvl, costmulti, affixes, invfile, baseItemsData } = props;

  // min/max flat added defense from affix
  const [flatAcAffixMinIfDefined, setFlatAcAffixMinIfDefined] = useState('');
  const [flatAcAffixMaxIfDefined, setFlatAcAffixMaxIfDefined] = useState('');
  // min/max percent added defense from affix
  const [percentAcAffixMinIfDefined, setPercentAcAffixMinIfDefined] = useState('');
  const [percentAcAffixMaxIfDefined, setPercentAcAffixMaxIfDefined] = useState('');

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









  // WIP BELOW

    // item has base ac with no affix modifiers
      // display base defense of item from baseItems.json
      let baseAcIfDefined;
      if (baseItemsData[code].ac) {
        baseAcIfDefined = `${baseItemsData[code].ac.min}-${baseItemsData[code].ac.max}`;
      }

    // item has base ac with flat ac modifier
      // display base defense of item from baseItems.json added with affix values
      let flatAcAffixIfDefined;
      if (baseItemsData[code].ac && flatAcAffixMinIfDefined && flatAcAffixMaxIfDefined) {
        flatAcAffixIfDefined = `${baseItemsData[code].ac.min + flatAcAffixMinIfDefined}-${baseItemsData[code].ac.max + flatAcAffixMaxIfDefined}`
      }

    // item has base ac with percent modifier
      let percentAcAffixIfDefined;

    // item has base ac with flat and percent modifiers
    
      // display base defense of item from baseItems.json multiplied with affix values
      

    
      let displayCalculatedAcIfDefined;
      if (baseAcIfDefined && flatAcAffixIfDefined) {
        displayCalculatedAcIfDefined = <div><span>Defense: <span className="text-blue">{flatAcAffixIfDefined}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;<span>(Base Defense: {baseAcIfDefined})</span></div>
      }



      // TODO: Test if re-render behavior is correct, seeing more console logs than expected
      // if item type has base defense stat
      if (baseItemsData[code].ac) {
        console.log('debug');
        console.log(name);
        if (baseItemsData[code].ac.min && baseItemsData[code].ac.max) {
          console.log('db-1');

          // has flatAC affix and percentAC affix
          if (flatAcAffixMinIfDefined && flatAcAffixMaxIfDefined && percentAcAffixMinIfDefined && percentAcAffixMaxIfDefined) {
            console.log('db-2');
          }
          // has flatAC affix only
          else if (flatAcAffixMinIfDefined && flatAcAffixMaxIfDefined && !percentAcAffixMinIfDefined && !percentAcAffixMaxIfDefined) {
            console.log('db-3');
          }
          // has percentAC affix only
          else if (!flatAcAffixMinIfDefined && !flatAcAffixMaxIfDefined && percentAcAffixMinIfDefined && percentAcAffixMaxIfDefined) {
            console.log('db-4');
          }

        }
      }
      console.log(name);

  // WIP ABOVE










  // display if item is ladder-only
  let ladderOnly;
  if (ladder === true) {
    ladderOnly = <div>(Ladder Only)</div>;
  }

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

        {/* {acIfDefined} */}
        {/* <div className="calculatedAC">{acAffixIfDefined}</div> */}
        {displayCalculatedAcIfDefined}

        {durIfDefined}
        <Affixes
          itemAffixes={affixes}
          rlvl={rlvl}
          setFlatAcAffixMinIfDefined={setFlatAcAffixMinIfDefined}
          setFlatAcAffixMaxIfDefined={setFlatAcAffixMaxIfDefined}
          setPercentAcAffixMinIfDefined={setPercentAcAffixMinIfDefined}
          setPercentAcAffixMaxIfDefined={setPercentAcAffixMaxIfDefined}
        />
        <div>{ladderOnly}</div>
      </div>
    </li>
  );
}

export default UniqueItem;
