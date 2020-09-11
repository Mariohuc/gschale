import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-signup-student",
  templateUrl: "./signup-student.component.html",
  styleUrls: ["./signup-student.component.css"],
})
export class SignupStudentComponent implements OnInit {
  form!: FormGroup;
  typeSchool: string[] = ["Nacional", "Particular", "Parroquial"];
  level: string[] = ["Primaria", "Secundaria"];
  primaria: string[] = ["3", "4", "5", "6"];
  secundaria: string[] = ["1", "2", "3", "4", "5"];
  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {}

  sendData() {
    console.log(this.form.value);
  }

  // construyendo el formulario en base a un JSON
  private buildForm() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.email]],
      password: ["", [Validators.required]],
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      numberCel: ["", Validators.maxLength(9)],
      place: ["", Validators.required],
      typeSchool: ["", Validators.required],
      nameSchool: "",
      nivel: ["", Validators.required],
      grade: ["", Validators.required],
    });
  }
}
