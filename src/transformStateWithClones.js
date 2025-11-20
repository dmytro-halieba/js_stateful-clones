'use strict';

/**
 * @param {Object} copyState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevState = { ...state };

  for (const actionObj of actions) {
    const action = actionObj.type;
    let nextState;

    switch (action) {
      case 'addProperties':
        nextState = { ...prevState, ...actionObj.extraData };
        break;

      case 'removeProperties':
        nextState = { ...prevState };

        for (const key of actionObj.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        continue;
    }

    result.push(nextState);
    prevState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
