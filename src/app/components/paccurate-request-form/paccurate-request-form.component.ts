import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: "app-paccurate-request-form",
  templateUrl: "./paccurate-request-form.component.html",
  styleUrls: ["./paccurate-request-form.component.scss"]
})
export class PaccurateRequestFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fB: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

  }

}
