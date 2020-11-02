import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartamento, IMunicipio } from 'app/modelos/depar-modelo';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  url: string = environment.url;

  constructor(private http: HttpClient) { }

  getAllDepartamentos(): Observable <IDepartamento[]>{
     return this.http.get<IDepartamento[]>(this.url + '/departamentos');
  }

  getAllMunicipios(idDepartamento: string):Observable<IMunicipio[]>{
     return this.http.get<IMunicipio[]>(`${this.url}/departamentos/municipios/${idDepartamento}`);
  } 

}
