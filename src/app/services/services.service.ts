import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ServicesService {
    Url = 'http://3.20.206.182:8082';
    //Url = 'http://192.168.20.23:8091';
    //Url = 'http://18.217.152.118:8091';

    constructor(private http: HttpClient) {

    }

    getTipoJugadores() {
        return this.http.get(
            this.Url + `/api/getjson`, { responseType: 'text' }).pipe(
                map((response: any) => {
                    return JSON.parse(response);
                }, error => {
                    return error;
                }),
            );
    }

    guardarRanking(nombre, identificacion, score) {
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',

            })
        };    
 
        return this.http.get(
            this.Url + `/api/saveRanking/` + nombre + '/' + identificacion + '/' + score, { responseType: 'text' }).pipe(
                map((response: any) => {
                    return response;
                }, error => {
                    return error;
                }),
            );
        
/*         return this.http.post(
            this.Url + `/api/saveRanking`,    JSON.stringify({email: "email", password: "password"}), httpOptions).pipe(
                map((response: any) => {
                    return response;
                }, error => {
                    return error;
                }),
            ); */
    }

    getRanking() {
        return this.http.get(
            this.Url + `/api/getRanking` ).pipe(
                map((response: any) => {
                    return response;
                }, error => {
                    return error;
                }),
            );
    }
}
