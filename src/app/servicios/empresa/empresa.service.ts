import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from 'app/modelos/empresa-modelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 url: string = environment.url;
 headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  // crear una empresa
  addEmpresa(empresa: Empresa){
    return this.http.post<any>(`${this.url}/empresas`, empresa);
  }

  // actualizar una empresa
  updateEmpresa(id: string, updatedEmpresa: Empresa): Observable<Empresa> {
        return this.http.put<Empresa>(`${this.url}/empresas/${id}`, updatedEmpresa);
  }

  // tslint:disable-next-line: no-trailing-whitespace
  
  // consumo api para recuperar listado de empresas
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url + '/empresas');
  }

  // eliminar empresa

  deleteEmpresa(id: string) {
     return this.http.delete(`${this.url}/empresas/${id}`);
  }

  // recuperar empresa en especifico
  getEmpresa(id: string): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/empresas/${id}`);
  }
}
