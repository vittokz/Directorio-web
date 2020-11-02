import { environment } from './../../../environments/environment.prod';
import { EmpresaService } from './../../servicios/empresa/empresa.service';
import { Component, OnInit } from '@angular/core';
import { Empresa } from 'app/modelos/empresa-modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-empresas',
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.css']
})
export class ListEmpresasComponent implements OnInit {
  listaEmpresas: Empresa[];
  url: string = environment.url;
  constructor(private empresaService: EmpresaService,
              private ruta: Router) {
    this.cargarDatosEmpresas();
   }

  ngOnInit(): void {
  }

  cargarDatosEmpresas(){
    this.empresaService.getEmpresas().subscribe(
      data => {
        this.listaEmpresas = data;
      },
      err => console.error(err)
    );
  }

  irDetalle(idEmpresa: string) {
    this.ruta.navigateByUrl('/detalle-empresa/' + idEmpresa);
  }

}
