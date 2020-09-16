import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonItems } from "../../shared/services/commons.service";
import { Roles } from "../../shared/models/user";

@Component({
  selector: "app-signup-student",
  templateUrl: "./signup-student.component.html",
  styleUrls: ["./signup-student.component.css"],
})
export class SignupStudentComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, public citems: CommonItems) {
    this.buildForm();
  }

  ngOnInit(): void {}

  sendData() {
    if (this.form.valid) {
      const registroEst = this.form.value;
      console.log(registroEst);
    }
  }

  // construyendo el formulario en base a un JSON
  private buildForm() {
    this.form = this.formBuilder.group({
      dni: [""],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      //confirmPassword: ["", [Validators.required]],
      fecha_nacimiento: [""],
      numero_celular: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],
      rol: [Roles.ALUMNO],
      activo: [true],
      //--------------------------------- DATOS SOLO DE ALUMNO----------------------------------------
      //place: ["", Validators.required],
      coor_latitud_referencia : [""],
      coor_longitud_referencia : [""],
      tipo_colegio : ["", [Validators.required]],
      nombre_colegio : [""],
      nivel_actual : ["", [Validators.required]],
      grado_actual : ["", [Validators.required]],
    });
  }
}
