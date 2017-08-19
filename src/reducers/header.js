export function notificacao(state ='', action){
    if(action.type=== 'NOTIFICA'){
        return action.msg;
    }
    return state;
}