import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Roles } from "../../shared/models/user";
import { CommonItems } from "../../shared/services/commons.service";
import { HorarioTestPsicoService } from "../../shared/services/horario_test_psicologicos.service";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-signup-voluntary",
  templateUrl: "./signup-voluntary.component.html",
  styleUrls: ["./signup-voluntary.component.css"],
})
export class SignupVoluntaryComponent implements OnInit {
  voluntaryFormP1: FormGroup;
  voluntaryFormP2: FormGroup;
  formPart = 0;
  horarios: any;
  constructor(
    private formBuilder: FormBuilder,
    public citems: CommonItems,
    public htp: HorarioTestPsicoService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
    this.voluntaryFormP1 = this.formBuilder.group(
      {
        //First part
        dni: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
        nombres: ["", [Validators.required]],
        apellidos: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
        fecha_nacimiento: [new Date(), [Validators.required]],
        numero_celular: ["", [Validators.required]],
        rol: [Roles.VOLUNTARIO],
        activo: [true]
      },
      {
        validator: this.mustMatch("password", "confirmPassword"),
      }
    );
    this.voluntaryFormP2 = this.formBuilder.group(
      {
        //Second part
        grado_academico: ["", [Validators.required]],
        carrera: ["", [Validators.required]],
        grados_de_interes: ["", [Validators.required]],
        areas_asesorias: ["", [Validators.required]],
        horas_libre_semana: ["", [Validators.required]],
        estado_civil: ["", [Validators.required]],
        numero_hijos: ["", [Validators.required]],
        experiencia: ["", []],
        horario_test_psico: ["", [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    this.htp.getHorarios().subscribe(data => { //data will be an array of objects
      this.horarios = data.map(e => ({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {})
        })
      )
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  signupVoluntary(){
    let userData = Object.assign({}, this.voluntaryFormP1.value);
    userData = Object.assign(userData, this.voluntaryFormP2.value);
    this.authService.signUpForVoluntary(userData).catch(error => this._snackBar.open( error.message, "Cerrar"));
    //console.log(userData);
  }
}
