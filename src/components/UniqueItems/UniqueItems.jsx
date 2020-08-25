import React from 'react';
import './UniqueItems.scss';

import UniqueItemsData from '../../data/uniqueItems.json';

function UniqueItems() {
  console.log('UniqueItemsData:');
  console.log(UniqueItemsData);

  const uniqueItem = UniqueItemsData.map(({name, enabled, ladder, code, rarity, ilvl, rlvl, costmulti, affixes }) => {
    console.log('affixes:');
    console.log(affixes);

    const affix = affixes.map((index) => {
      let result;
      for (const [key, value] of Object.entries(index)) {
        console.log(key);
        console.log(value);

        function getRange(min, max) {
          if (min !== max) return `${min}-${max}`;
          return min.toString()
        }

        function getMinMax(min, max) {
          if (min !== max) return `(${min}-${max})`;
          return min.toString()
        }

        function getPosNegMinMax(min, max) {
          if (min >= 0 && max >= 0) {
            if (min !== max) return `+(${min}-${max})`;
            return `+${min}`;
          }
          else if (min <= 0 && max > 0) {
            return `+(${min}-${max})`;
          }
          else if (min < 0 && max < 0) {
            if (min !== max) return `-(${min*(-1)}-${max*(-1)})`;
            return `${min}`;
          }
          else {
            alert('Error: Impossible affix configuration; verify database values.');
            return NaN;
          }
        }

        switch (key) {
          case 'abs-cold%':
            result = `Cold Absorb ${getMinMax(value.min, value.max)}%`;
            break;
          case 'abs-fire%':
            result = `Fire Absorb ${getMinMax(value.min, value.max)}%`;
            break;
          case 'abs-ltng%':
            result = `Lightning Absorb ${getMinMax(value.min, value.max)}%`;
            break;
          case 'ac':
            result = `${getPosNegMinMax(value.min, value.max)} Defense`;
            break;
          case 'ac-miss':
            result = `${getPosNegMinMax(value.min, value.max)} Defense vs. Missile`;
            break;
          case 'all-stats':
            result = `${getPosNegMinMax(value.min, value.max)} To All Attributes`;
            break;
          case 'allskills':
            result = `${getPosNegMinMax(value.min, value.max)} To All Skills`;
            break;
          case 'att':
            result = `${getPosNegMinMax(value.min, value.max)} To Attack Rating`;
            break;
          case 'att%':
            result = `${getPosNegMinMax(value.min, value.max)}% Bonus To Attack Rating`;
            break;
          case 'att-demon':
            result = `${getPosNegMinMax(value.min, value.max)} To Attack Rating Against Demons`;
            break;
          case 'att-undead':
            result = `${getPosNegMinMax(value.min, value.max)} To Attack Rating Against Undead`;
            break;
          case 'balance2':
            result = `${getPosNegMinMax(value.min, value.max)}% Faster Hit Recovery`;
            break;
          case 'dex':
            result = `${getPosNegMinMax(value.min, value.max)} To Dexterity`;
            break;
          case 'dmg-demon':
            result = `${getPosNegMinMax(value.min, value.max)}% Damage To Demons`;
            break;
          case 'dmg-undead':
            result = `${getPosNegMinMax(value.min, value.max)}% Damage To Undead`;
            break;
          case 'dmg-fire':
            result = `Adds ${getRange(value.min, value.max)} Fire Damage`;
            break;
          case 'dmg-ltng':
            result = `Adds ${getRange(value.min, value.max)} Lightning Damage`;
            break;
          case 'dmg-to-mana':
            result = `${getMinMax(value.min, value.max)}% Damage Taken Goes To Mana`;
            break;
          case 'fireskill':
            result = `${getPosNegMinMax(value.min, value.max)} To Fire Skills`;
            break;
          case 'gold%':
            result = `${getMinMax(value.min, value.max)}% Extra Gold From Monsters`;
            break;
          case 'hp':
            result = `${getPosNegMinMax(value.min, value.max)} To Life`;
            break;
          case 'lifesteal':
            result = `${getMinMax(value.min, value.max)}% Life Stolen Per Hit`;
            break;
          case 'light':
            result = `${getPosNegMinMax(value.min, value.max)} To Light Radius`;
            break;
          case 'light-thorns':
            result = `Attacker Takes Lightning Damage of ${getMinMax(value.min, value.max)}`;
            break;
          case 'mag%':
            result = `${getMinMax(value.min, value.max)}% Better Chance of Getting Magic Items`;
            break;
          case 'mana':
            result = `${getPosNegMinMax(value.min, value.max)} To Mana`;
            break;
          case 'mana%':
            result = `Increase Maximum Mana ${getMinMax(value.min, value.max)}%`;
            break;
          case 'manasteal':
            result = `${getMinMax(value.min, value.max)}% Mana Stolen Per Hit`;
            break;
          case 'move2':
            result = `${getPosNegMinMax(value.min, value.max)}% Faster Run/Walk`;
            break;
          case 'red-mag':
            result = `Magic Damage Reduced By ${getMinMax(value.min, value.max)}`;
            break;
          case 'regen':
            result = `Replenish Life ${getPosNegMinMax(value.min, value.max)}`;
            break;
          case 'regen-mana':
            result = `Regenerate Mana ${getMinMax(value.min, value.max)}%`;
            break;
          case 'regen-stam':
            result = `Heal Stamina Plus ${getMinMax(value.min, value.max)}%`;
            break;
          case 'res-all':
            result = `All Resistances ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'res-fire':
            result = `Fire Resist ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'res-fire-max':
            result = `${getPosNegMinMax(value.min, value.max)}% To Maximum Fire Resist`;
            break;
          case 'res-ltng':
            result = `Lightning Resist ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'res-pois':
            result = `Poison Resist ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'stam':
            result = `${getPosNegMinMax(value.min, value.max)} Maximum Stamina`;
            break;
          case 'swing2':
            result = `${getPosNegMinMax(value.min, value.max)}% Increased Attack Speed`;
            break;
          case 'thorns':
            result = `Attacker Takes Damage of ${getMinMax(value.min, value.max)}`;
            break;
          default:
            result = `Unknown Affix`
        }
      }
      return <li>{result}</li>
    });

    return (
      <li>
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
          <ul>{affix}</ul>
        </div>
      </li>
    );
  });

  return (
    <ul className="uniqueItemList">
      {uniqueItem}
    </ul>
  );
}

export default UniqueItems;
