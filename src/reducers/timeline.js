
export function timeline(state=[], action){
  if(action.type === 'LISTAGEM'){
    console.log("Listando fotos!");
    return action.fotos;
  }

  return state;
}