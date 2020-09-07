import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-signup-voluntary",
  templateUrl: "./signup-voluntary.component.html",
  styleUrls: ["./signup-voluntary.component.css"],
})
export class SignupVoluntaryComponent implements OnInit {
  voluntaryForm: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.voluntaryForm = this.formBuilder.group(
      {
        dni: ["", Validators.required, Validators.pattern(/^\d{8}$/)],
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        confirmPassword: ["", Validators.required],
        fecha_nacimiento: ["", Validators.required],
        numero_celular: ["", Validators.required],
      },
      {
        validator: this.mustMatch("password", "confirmPassword"),
      }
    );
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
}
