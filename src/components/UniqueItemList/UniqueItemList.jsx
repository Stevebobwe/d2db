import React, { useState } from 'react';
import UniqueItemsData from '../../data/uniqueItems.json';
import BaseItemsData from '../../data/baseItems.json';
import UniqueItem from '../UniqueItem/UniqueItem';
import './UniqueItemList.scss';

function UniqueItemList() {
  const [byNameFilter, setByNameFilter] = useState('');

  // Required level
  const [byMinrlvlFilter, setByMinrlvlFilter] = useState(1);
  const [byMaxrlvlFilter, setByMaxrlvlFilter] = useState(99);

  // Required Strength
  const [byMinstrFilter, setByMinstrFilter] = useState(0);
  const [byMaxstrFilter, setByMaxstrFilter] = useState(999);

  // Required Dexterity
  const [byMindexFilter, setByMindexFilter] = useState(0);
  const [byMaxdexFilter, setByMaxdexFilter] = useState(999);

  // Class-Specific
  const [byReqClassFilter, setByReqClassFilter] = useState('');


  let filteredUniqueItemsData = UniqueItemsData;

  // array of filter functions
  const filterFnsToApply = [];

  if (byNameFilter) {
    const byNameFilterFn = item => {
      // remove items whose names do not contain the input
      return item.name.toLowerCase().indexOf(byNameFilter.toLowerCase()) >= 0;
    };
    filterFnsToApply.push(byNameFilterFn);
  }

  if (byMinrlvlFilter) {
    const byMinrlvlFilterFn = item => {
      // remove items whose level requirement is less than the input
      return item.rlvl >= byMinrlvlFilter;
    };
    filterFnsToApply.push(byMinrlvlFilterFn);
  }
  if (byMaxrlvlFilter) {
    const byMaxrlvlFilterFn = item => {
      // remove items whose level requirement is greater than the input
      return item.rlvl <= byMaxrlvlFilter;
    };
    filterFnsToApply.push(byMaxrlvlFilterFn);
  }

  // additional filters here

  filterFnsToApply.forEach(filterFn => {
    filteredUniqueItemsData = filteredUniqueItemsData.filter(filterFn);
  });

  console.log('TEST');
  console.log(BaseItemsData['amu']);
  //console.log(BaseItemsData.amu.name);

  const itemList = filteredUniqueItemsData
    .map(item => {
      return <UniqueItem {...item} baseItemsData={BaseItemsData}/>;
  });

  return (
    <div>
      <form>
        <label>Name&nbsp;</label>
        <input id="byNameFilter" type="text" placeholder="Search..." onChange={ e => setByNameFilter(e.target.value) }/>
        <hr/>

        <h4>Requirements</h4>
        <label>Level&nbsp;</label>
        <input type="text" placeholder="min" onChange={ e => setByMinrlvlFilter(e.target.value) }/>
        <input type="text" placeholder="max" onChange={ e => setByMaxrlvlFilter(e.target.value) }/>
        <br/>

        <label>Strength&nbsp;</label>
        <input type="text" placeholder="min" onChange={ e => setByMinstrFilter(e.target.value) }/>
        <input type="text" placeholder="max" onChange={ e => setByMaxstrFilter(e.target.value) }/>
        <span> (not fully implemented yet)</span>
        <br/>

        <label>Dexterity&nbsp;</label>
        <input type="text" placeholder="min" onChange={ e => setByMindexFilter(e.target.value) }/>
        <input type="text" placeholder="max" onChange={ e => setByMaxdexFilter(e.target.value) }/>
        <span> (not fully implemented yet)</span>
        <br/>

        <label>Class-Specific&nbsp;</label>
        <select onChange={ e => setByReqClassFilter(e.target.value) }>
          <option value="">Any</option>
          <option value="ama">Amazon</option>
          <option value="ass">Assassin</option>
          <option value="bar">Barbarian</option>
          <option value="dru">Druid</option>
          <option value="nec">Necromancer</option>
          <option value="pal">Paladin</option>
          <option value="sor">Sorceress</option>
        </select>
        <span> (not fully implemented yet)</span>
        <hr/>
      </form>

      <ul className='uniqueItemList'>
        {itemList}
      </ul>
    </div>
  );
}

export default UniqueItemList;



{/* <h4>Affixes</h4>
//Fancy select dropdown with text-filter of options; min/max values https://i.imgur.com/unXTN86.png
<select>
  <option value="">Any</option>
</select>
<input type="text" placeholder="min"/>
<input type="text" placeholder="max"/>
  Remove Button
  Add Affix Button
  Dropdown with:
  AND (All specified mods must exist and match their values.)
  NOT (None of specified mods must exist.)
  COUNT (Specify the number of mods that should be matched. Adds min/max text inputs)
  SUM (The mods' values must add to the specified total value. Adds min/max text inputs)

<hr/>

<h4>Misc</h4>
<label>Ladder</label>
<select>
  <option value="">Either</option>
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

<hr/> */}


{/* <label>Type</label>
<select>
  <option>Any</option>
  
  <option className="optgroup" value="armo">Armour</option>
  <option value="belt">&nbsp;&nbsp;&nbsp;&nbsp;Belt</option>
  <option value="tors">&nbsp;&nbsp;&nbsp;&nbsp;Body Armour</option>
  <option value="boot">&nbsp;&nbsp;&nbsp;&nbsp;Boots</option>
  <option value="glov">&nbsp;&nbsp;&nbsp;&nbsp;Gloves</option>
  <option value="helm">&nbsp;&nbsp;&nbsp;&nbsp;Helmet</option>
  <option value="shld">&nbsp;&nbsp;&nbsp;&nbsp;Shield</option>

  <option className="optgroup" value="jlry">Jewelry</option>
  <option value="amul">&nbsp;&nbsp;&nbsp;&nbsp;Amulet</option>
  <option value="ring">&nbsp;&nbsp;&nbsp;&nbsp;Ring</option>

  <optgroup label="Misc">
    <option value="char">Charm</option>
    <option value="jewl">Jewel</option>
  </optgroup>

  <option className="optgroup" value="weap">Weapon</option>
  <option value="axe">&nbsp;&nbsp;&nbsp;&nbsp;Axe</option>
  <option value="bow">&nbsp;&nbsp;&nbsp;&nbsp;Bow</option>
  <option value="claw">&nbsp;&nbsp;&nbsp;&nbsp;Claw (Assassin Only)</option>
  <option value="xbow">&nbsp;&nbsp;&nbsp;&nbsp;Crossbow</option>
  <option value="dagg">&nbsp;&nbsp;&nbsp;&nbsp;Dagger</option>
  <option value="jav">&nbsp;&nbsp;&nbsp;&nbsp;Javelin</option>
  <option value="mace">&nbsp;&nbsp;&nbsp;&nbsp;Mace</option>
  <option value="orb">&nbsp;&nbsp;&nbsp;&nbsp;Orb (Sorceress Only)</option>
  <option value="pole">&nbsp;&nbsp;&nbsp;&nbsp;Polearm</option>
  <option value="scep">&nbsp;&nbsp;&nbsp;&nbsp;Scepter</option>
  <option value="spea">&nbsp;&nbsp;&nbsp;&nbsp;Spear</option>
  <option value="staf">&nbsp;&nbsp;&nbsp;&nbsp;Staff</option>
  <option value="swor">&nbsp;&nbsp;&nbsp;&nbsp;Sword</option>
  <option value="wand">&nbsp;&nbsp;&nbsp;&nbsp;Wand</option>
</select>
<br/>

<label>Tier</label>
<select>
  <option value="">Any</option>
  <option value="elite">Elite</option>
  <option value="exceptional">Exceptional</option>
  <option value="normal">Normal</option>
</select>
<br/> */}