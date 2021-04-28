import axios from 'axios';
//import React, {Component} from 'react';



export class PersonaService {

    baseUrl = "http://localhost:9090/";
    headers = {Accept:'application/json'
    ,'Authorization':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiY2FtcG9zQGJjYW1wb3MuY29tIiwiZXhwIjoxNjIwNTA4NzA1fQ.25suXMLh6qOHMNYnt8xBMITiBRiuS8UrhWLzMIocq6I0lg9m0Mtak-sYYoW2AvpSNKGka_gBYCkrd6VlgXxJeg'};
   

    getAll(){
         return axios.get(this.baseUrl + 'paciente',{ headers: this.headers })
         .then(res => res.data);
    }

    save(persona) {
        return axios.post(this.baseUrl + "paciente", persona,{ headers: this.headers }).then(res => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + "paciente/"+id,{ headers: this.headers }).then(res => res.data);
    }

}