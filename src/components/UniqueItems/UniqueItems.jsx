import React from 'react';
import './UniqueItems.scss';

import UniqueItemsData from '../../data/uniqueItems.json';

function UniqueItems() {
  console.log('UniqueItemsData:');
  console.log(UniqueItemsData);

  const uniqueItem = UniqueItemsData.map(({name, enabled, ladder, code, rarity, ilvl, rlvl, costmulti, affixes : affixesArray }) => {
    console.log('affixes:');
    console.log(affixesArray);

    const affixes = affixesArray.map((affixObject) => {
      let affix;
      for (const [key, value] of Object.entries(affixObject)) {
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

        function getMinMaxPoisonDamage(min, max, duration) {
          if (min !== max) return `+(${min}-${max}) Poison Damage over ${duration} seconds`;
          return `+${min.toString()} Poison Damage over ${duration} seconds`
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
            console.log('Error (Affix Configuration)');
            return NaN;
          }
        }

        // Display affix with skillcategory bonus
        function getSkillTabBonus(min, max, skillcategory) {
          if (min !== max) {
            return `+(${min}-${max}) To ${skillcategory}`;
          }
          else {
            return `+${min} To ${skillcategory}`;
          }
        }

        // Display affix with variable min, max, duration
        function getVariableRangeColdDamage(min, max, duration) {
          if (min && max && duration) {
            let CalculatedDuration, CalculatedDurationMin, CalculatedDurationMax;
            if (Array.isArray(min) && Array.isArray(max) && Array.isArray(duration)) {
              if (min[0] && min[1] && min[0] < min[1] && max[0] && max[1] && max[0] < max[1] && duration[0] && duration[1] && duration[0] < duration[1]) {
                // Execute if min/max/duration ranges are valid
                CalculatedDurationMin = duration[0] / 25;
                CalculatedDurationMin = Math.floor(CalculatedDurationMin);
                CalculatedDurationMax = duration[1] / 25;
                CalculatedDurationMax = Math.floor(CalculatedDurationMax);
                return `((${min[0]}-${min[1]})-(${max[0]}-${max[1]})) Cold Damage [Chill Duration: (${CalculatedDurationMin}-${CalculatedDurationMax}) Seconds]`;
              }
            }
            else if (Array.isArray(min) && Array.isArray(max) && !Array.isArray(duration)) {
              // Execute if min/max ranges are valid with integer duration
              CalculatedDuration = duration / 25;
              CalculatedDuration = Math.floor(CalculatedDuration);
              return `((${min[0]}-${min[1]})-(${max[0]}-${max[1]})) Cold Damage [Chill Duration: ${CalculatedDuration} Seconds]`;
            }
            else if (!Array.isArray(min) && !Array.isArray(max) && !Array.isArray(duration)) {
              // Execute if min/max/duration are integers
              CalculatedDuration = duration / 25;
              CalculatedDuration = Math.floor(CalculatedDuration);
              return `${min}-${max} Cold Damage [Chill Duration: ${CalculatedDuration} Seconds]`;
            }
          }
          else {
            console.log('Error (Affix Configuration)');
            return `Error (Affix Configuration)`;
          }
        }

        // Display affix granting per-level bonuses
        function getPerLevelIncrease(val) {
          val = val / 8;
          let minVal = rlvl * val;
          minVal = Math.floor(minVal);
          let maxVal = 99 * val;
          maxVal = Math.floor(maxVal);
          return `+(${val} Per Character Level) ${minVal}-${maxVal}`
        }

        // Display affix granting charged-skill
        function getChargedSkill(charges, lvl, skill) {
          if (charges && charges > 0 && lvl && lvl > 0 && skill) {
            return `Level ${lvl} ${skill.toString()} (${charges} Charges)`;
          }
          else {
            console.log('Error (Affix Configuration)');
            return `Error (Affix Configuration)`;
          }
        }

        // Display affix granting gethit-skill or hit-skill
        function getHitSkill(chance, lvl, skill) {
          if (chance && lvl && skill) {
            if (Array.isArray(chance) && Array.isArray(lvl)) {
              // Chance and Level are arrays
              if (chance[0] && chance[1] && chance[0] < chance[1] && lvl[0] && lvl[1] && lvl[0] < lvl[1]) {
                return `(${chance[0]}-${chance[1]})% Chance To Cast Level (${lvl[0]}-${lvl[1]}) ${skill.toString()}`;
              }
              else {
                console.log('Error (Affix Configuration)');
                return `Error (Affix Configuration)`;
              }
            }
            else if (Array.isArray(chance) && !Array.isArray(lvl)) {
              // Chance is an array
              if (chance[0] && chance[1] && chance[0] < chance[1]) {
                return `(${chance[0]}-${chance[1]})% Chance To Cast Level ${lvl} ${skill.toString()}`;
              }
              else {
                console.log('Error (Affix Configuration)');
                return `Error (Affix Configuration)`;
              }
            }
            else if (!Array.isArray(chance) && Array.isArray(lvl)) {
              // Level is an array
              if (lvl[0] && lvl[1] && lvl[0] < lvl[1]) {
                return `${chance}% Chance To Cast Level (${lvl[0]}-${lvl[1]}) ${skill.toString()}`;
              }
              else {
                console.log('Error (Affix Configuration)');
                return `Error (Affix Configuration)`;
              }
            }
            else if (!Array.isArray(chance) && !Array.isArray(lvl)) {
              // Chance and Level are not arrays
              return `${chance}% Chance To Cast Level ${lvl} ${skill.toString()}`;
            }
          }
          else {
            console.log('Error (Affix Configuration)');
            return `Error (Affix Configuration)`;
          }
        }

        switch (key) {
          case 'abs-cold%':
            affix = `Cold Absorb ${getMinMax(value.min, value.max)}%`;
            break;
          case 'abs-fire%':
            affix = `Fire Absorb ${getMinMax(value.min, value.max)}%`;
            break;
          case 'abs-fire/lvl':
            affix = `${getPerLevelIncrease(value)} Fire Absorb (Based On Character Level)`;
            break;
          case 'abs-ltng%':
            affix = `Lightning Absorb ${getMinMax(value.min, value.max)}%`;
            break;
          case 'ac':
            affix = `${getPosNegMinMax(value.min, value.max)} Defense`;
            break;
          case 'ac%':
            affix = `${getPosNegMinMax(value.min, value.max)}% Enhanced Defense`;
            break;
          case 'ac-miss':
            affix = `${getPosNegMinMax(value.min, value.max)} Defense vs. Missile`;
            break;
          case 'all-stats':
            affix = `${getPosNegMinMax(value.min, value.max)} To All Attributes`;
            break;
          case 'allskills':
            affix = `${getPosNegMinMax(value.min, value.max)} To All Skills`;
            break;
          case 'att':
            affix = `${getPosNegMinMax(value.min, value.max)} To Attack Rating`;
            break;
          case 'att%':
            affix = `${getPosNegMinMax(value.min, value.max)}% Bonus To Attack Rating`;
            break;
          case 'att-demon':
            affix = `${getPosNegMinMax(value.min, value.max)} To Attack Rating Against Demons`;
            break;
          case 'att-undead':
            affix = `${getPosNegMinMax(value.min, value.max)} To Attack Rating Against Undead`;
            break;
          case 'balance2':
            affix = `${getPosNegMinMax(value.min, value.max)}% Faster Hit Recovery`;
            break;
          case 'charged-skill':
            affix = `${getChargedSkill(value.charges, value.lvl, value.skill)}`;
            break;
          case 'deadly/lvl':
            affix = `${getPerLevelIncrease(value)}% Deadly Strike (Based On Character Level)`;
            break;
          case 'dex':
            affix = `${getPosNegMinMax(value.min, value.max)} To Dexterity`;
            break;
          case 'dmg-cold':
            affix = `Adds ${getVariableRangeColdDamage(value.min, value.max, value.duration)}`;
            break;
            case 'dmg-demon':
            affix = `${getPosNegMinMax(value.min, value.max)}% Damage To Demons`;
            break;
          case 'dmg-fire':
            affix = `Adds ${getRange(value.min, value.max)} Fire Damage`;
            break;
          case 'dmg-ltng':
            affix = `Adds ${getRange(value.min, value.max)} Lightning Damage`;
            break;
          case 'dmg-pois':
            affix = `${getMinMaxPoisonDamage(value.min, value.max, value.duration)}`;
            break;
          case 'dmg-to-mana':
            affix = `${getMinMax(value.min, value.max)}% Damage Taken Goes To Mana`;
            break;
          case 'dmg-undead':
            affix = `${getPosNegMinMax(value.min, value.max)}% Damage To Undead`;
            break;
          case 'fireskill':
            affix = `${getPosNegMinMax(value.min, value.max)} To Fire Skills`;
            break;
          case 'gethit-skill':
            affix = `${getHitSkill(value['chance%'], value.lvl, value.skill)} When Struck`;
            break;
          case 'gold%':
            affix = `${getMinMax(value.min, value.max)}% Extra Gold From Monsters`;
            break;
          case 'hit-skill':
            affix = `${getHitSkill(value['chance%'], value.lvl, value.skill)} On Striking`;
            break;
          case 'hp':
            affix = `${getPosNegMinMax(value.min, value.max)} To Life`;
            break;
          case 'hp/lvl':
            affix = `${getPerLevelIncrease(value)} To Life (Based On Character Level)`;
            break;
          case 'lifesteal':
            affix = `${getMinMax(value.min, value.max)}% Life Stolen Per Hit`;
            break;
          case 'light':
            affix = `${getPosNegMinMax(value.min, value.max)} To Light Radius`;
            break;
          case 'light-thorns':
            affix = `Attacker Takes Lightning Damage of ${getMinMax(value.min, value.max)}`;
            break;
          case 'mag%':
            affix = `${getMinMax(value.min, value.max)}% Better Chance of Getting Magic Items`;
            break;
          case 'mana':
            affix = `${getPosNegMinMax(value.min, value.max)} To Mana`;
            break;
          case 'mana%':
            affix = `Increase Maximum Mana ${getMinMax(value.min, value.max)}%`;
            break;
          case 'manasteal':
            affix = `${getMinMax(value.min, value.max)}% Mana Stolen Per Hit`;
            break;
          case 'move2':
            affix = `${getPosNegMinMax(value.min, value.max)}% Faster Run/Walk`;
            break;
          case 'nofreeze':
            affix = `Cannot Be Frozen`;
            break;
          case 'noheal':
            affix = `Prevent Monster Heal`;
            break;
          case 'red-dmg':
            affix = `Damage Taken Reduced By ${getMinMax(value.min, value.max)}`;
            break;
          case 'red-mag':
            affix = `Magic Damage Taken Reduced By ${getMinMax(value.min, value.max)}`;
            break;
          case 'regen':
            affix = `Replenish Life ${getPosNegMinMax(value.min, value.max)}`;
            break;
          case 'regen-mana':
            affix = `Regenerate Mana ${getMinMax(value.min, value.max)}%`;
            break;
          case 'regen-stam':
            affix = `Heal Stamina Plus ${getMinMax(value.min, value.max)}%`;
            break;
          case 'res-all':
            affix = `All Resistances ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'res-fire':
            affix = `Fire Resist ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'res-fire-max':
            affix = `${getPosNegMinMax(value.min, value.max)}% To Maximum Fire Resist`;
            break;
          case 'res-ltng':
            affix = `Lightning Resist ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'res-pois':
            affix = `Poison Resist ${getPosNegMinMax(value.min, value.max)}%`;
            break;
          case 'rip':
            affix = `Slain Monsters Rest In Peace`;
            break;
          case 'skilltab':
            affix = `${getSkillTabBonus(value.min, value.max, value.skillcategory)}`;
            break;
          case 'stam':
            affix = `${getPosNegMinMax(value.min, value.max)} Maximum Stamina`;
            break;
          case 'swing2':
            affix = `${getPosNegMinMax(value.min, value.max)}% Increased Attack Speed`;
            break;
          case 'thorns':
            affix = `Attacker Takes Damage of ${getMinMax(value.min, value.max)}`;
            break;
          default:
            affix = `Unknown Affix`
        }
      }
      return <li>{affix}</li>
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
          <ul>{affixes}</ul>
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
