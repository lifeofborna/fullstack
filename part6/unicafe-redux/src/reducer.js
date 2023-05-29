const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return updateState(state, 'good', 1);
    case 'OK':
      return updateState(state, 'ok', 1);
    case 'BAD':
      return updateState(state, 'bad', 1);
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      };
    default:
      return state;
  }
}

const updateState = (state,key,value) => {
  return{
    ...state,
    [key]: state[key]+ value
  }
}


export default counterReducer
