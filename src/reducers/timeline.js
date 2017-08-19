import {List} from 'immutable';

function trocaFoto(lista, fotoId, callBackAtualizaPropriedades){
    const fotoEstadoAntigo = lista.find(foto=>foto.id === fotoId);
    const novasPropriedades = callBackAtualizaPropriedades(fotoEstadoAntigo);
    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);
    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);
    return lista.set(indiceDaLista, fotoEstadoNovo);
}

export function timeline(state=new List(), action){

  if(action.type === 'LISTAGEM'){
    console.log("Listando fotos!");
    return new List(action.fotos);
  } 

  
  if(action.type === 'COMENTARIO'){
    return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
      const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario);
      return {comentarios:novosComentarios};
    });
  }

  if(action.type === 'LIKE'){

      return trocaFoto(state, action.fotoId, fotoEstadoAntigo => {
        const likeada = !fotoEstadoAntigo.likeada;
        
        const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === action.liker.login);

        let novosLikers;
        if(possivelLiker===undefined){
          novosLikers = fotoEstadoAntigo.likers.concat(action.liker);
        } else {
          novosLikers = fotoEstadoAntigo.likers.filter(likerAtual =>likerAtual.login !== action.liker.login);
        }

        return {likeada,likers:novosLikers};
      });
  }

  return state;
}