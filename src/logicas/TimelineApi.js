import {listagem, comentario, like, notifica} from  '../actions/actionCreator';

export default class TimelineApi {

   static lista(urlPerfil){
        return dispatch => {
            fetch(urlPerfil)
                .then(response=> response.json())
                .then(fotos => {
                    dispatch(listagem(fotos))
                    return fotos;
                });
        }
    }


    static like(fotoId){
        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}` , {method:'POST'})
            .then(response=> {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error('Não foi possível realizar o like na foto');
                }
            })
            .then(liker =>{
                dispatch(like(fotoId, liker));
                return liker;
            });
        }
    }


    static comenta(fotoId, textoComentario){
        return dispatch => {
            const requestInfo = {
            method : 'POST',
            body : JSON.stringify({texto:textoComentario}),
            headers : new Headers({
                'Content-type' : 'application/json'
            })

            };
            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
            .then(response=>{
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Não foi possível comentar!");
                }
            })
            .then(novoComentario=>{
                dispatch(comentario(fotoId, novoComentario));
                return novoComentario;
            });
        }
    }

    static pesquisa(loginPesquisado){
        return dispatch => {
            fetch(`http://localhost:8080/api/public/fotos/${loginPesquisado}`)
            .then(response => response.json())
            .then(fotos => {
                if(fotos.length===0){
                    dispatch(notifica('Usuário não encontrado!'));
                } else {
                    dispatch(notifica('Usuário encontrado!'));
                }
                console.log(fotos);
                dispatch(listagem(fotos));
                return fotos;
            });
        }
    }

}