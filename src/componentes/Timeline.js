import React, { Component } from 'react';
import FotoItem from './Foto';
import Pubsub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class Timeline extends Component {

    constructor(props){
        super(props);
        this.state = {fotos:[]};
        this.login = this.props.login;
    }

    componentWillMount(){
        Pubsub.subscribe('timeline', (topico,fotos)  => {
            this.setState({fotos});
        });
    }

    carregaFotos(props){
        let urlPerfil;
        if(this.login===undefined){
            urlPerfil = `http://localhost:8080/api/fotos/?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }
        

        fetch(urlPerfil)
            .then(response=> response.json())
            .then(fotos => {
                this.setState({fotos:fotos});
            });
    }

    componentDidMount(){
       this.carregaFotos();
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.login!== undefined){
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render(){
        return (
        <div className="fotos container">
            <ReactCSSTransitionGroup
                transitionName="timeline"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }
            </ReactCSSTransitionGroup>
        </div>            
        );
    }
}
