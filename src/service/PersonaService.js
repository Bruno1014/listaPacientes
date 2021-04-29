import axios from 'axios';
//import React, {Component} from 'react';



export class PersonaService {

    baseUrl = "http://localhost:9090/";
    headers = {Accept:'application/json'
    ,'Authorization':'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiY2FtcG9zQGJjYW1wb3MuY29tIiwiZXhwIjoxNjIwNTEzNTI2fQ.xzVxCrTtNlDS0UyClqHE0DIiRVuuj7JdDXuIr6mzlKDE6Gn66Fp3xgvjUsA8iAdrAdvPt9x8_xYjoSTJ1rKOxw'};
   

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