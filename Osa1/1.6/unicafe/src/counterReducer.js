const initialState = {
  good: 0,
  ok:0,
  bad:0
}
const counterReducer = (state=initialState, action) => {
  console.log(action)
  let tempState = Object.assign({}, state)
  switch (action.type) {
    case 'GOOD':
      tempState.good += 1
      break
    case 'OK':
      tempState.ok += 1
      break
    case 'BAD':
      tempState.bad +=1
      break
    case 'ZERO':
      tempState = Object.assign({}, initialState)
      break
    default:
      break
  }
  return tempState
}

export default counterReducer
