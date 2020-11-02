import { EmpresaService } from './../../servicios/empresa/empresa.service';
import { Empresa } from './../../modelos/empresa-modelo';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MunicipiosService } from 'app/servicios/municipios.service';
import { IDepartamento, IMunicipio } from 'app/modelos/depar-modelo';

@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styleUrls: ['./registrar-empresa.component.css']
})
export class RegistrarEmpresaComponent implements OnInit {
  formRegistro: FormGroup;
  empresaNueva: Empresa = new Empresa();
  registado:string;
  listDepartamentos: IDepartamento[];
  listMunicipios: IMunicipio[];

  constructor(private formBuilder: FormBuilder, private empresaService: EmpresaService,
              private departService: MunicipiosService) {   
   }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarDepartamentos();
  }

  cargarDepartamentos(){
    this.departService.getAllDepartamentos().subscribe(
      data=>{
        this.listDepartamentos = data;
       },
      err => console.error(err)
    );
  }

  selecDep(event){
    console.log("evento:",event);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formRegistro.get('avatar').setValue(file);
    }
  }

  crearFormulario(){
    this.formRegistro = this.formBuilder.group({
      tipoDoc: ['', Validators.required],
      identidad: ['', Validators.required],
      razon: ['', Validators.required],
      nomResponsable: ['', Validators.required],
      apeResponsable: ['', Validators.required],
      descripcion: ['', Validators.required],
      avatar: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      facebook: ['', Validators.required],
      sitio: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      categoria: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  registrarEmpresa(){
     const formData = new FormData();
     this.empresaNueva.tipoDoc = this.formRegistro.get('tipoDoc').value;
     this.empresaNueva.identidad = this.formRegistro.get('identidad').value;
     this.empresaNueva.razonSocial = this.formRegistro.get('razon').value;
     this.empresaNueva.nombreResponsable = this.formRegistro.get('nomResponsable').value;
     this.empresaNueva.apellidoResponsable = this.formRegistro.get('apeResponsable').value;
     this.empresaNueva.descripcion = this.formRegistro.get('descripcion').value;
     this.empresaNueva.logo = this.formRegistro.get('avatar').value;
     this.empresaNueva.direccion = this.formRegistro.get('direccion').value;
     this.empresaNueva.telefono = this.formRegistro.get('telefono').value;
     this.empresaNueva.movil = this.formRegistro.get('celular').value;
     this.empresaNueva.email = this.formRegistro.get('email').value;
     this.empresaNueva.facebook = this.formRegistro.get('facebook').value;
     this.empresaNueva.sitioWeb = this.formRegistro.get('sitio').value;
     this.empresaNueva.departamento = this.formRegistro.get('departamento').value;
     this.empresaNueva.municipio = this.formRegistro.get('ciudad').value;
     this.empresaNueva.categoria = this.formRegistro.get('categoria').value;
     this.empresaNueva.clave = this.formRegistro.get('clave').value;
     this.empresaNueva.estado = 'Activo';
     this.empresaNueva.usuarioRegistro = 'web';
     this.empresaService.addEmpresa(this.empresaNueva).subscribe(
       data => {
        if (data['resul'] > 0) {
             this.registado = 'ok';
             this.formRegistro.reset();
        }
        else {
             this.registado = 'error';
        }
       }
     );
  }

}
