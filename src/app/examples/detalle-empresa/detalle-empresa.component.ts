import { Component, OnInit } from '@angular/core';
import { Empresa } from 'app/modelos/empresa-modelo';
import { EmpresaService } from 'app/servicios/empresa/empresa.service';
import { environment } from 'environments/environment.prod';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css']
})
export class DetalleEmpresaComponent implements OnInit {

  EmpresaSelec: Empresa = new Empresa();
  url: string = environment.url;
  idEmpresa: string;

  constructor(private empresaService: EmpresaService,
              private rutaActiva: ActivatedRoute) {
      this.idEmpresa = this.rutaActiva.snapshot.params.id;
      this.cargarEmpresa(this.idEmpresa);
   }

  ngOnInit(): void {
  }

  cargarEmpresa(idEmpresa: string){
     this.empresaService.getEmpresa(idEmpresa).subscribe(
       data => {
         console.log(JSON.stringify(data));
          this.EmpresaSelec = data;
       }
     );
  }

}
