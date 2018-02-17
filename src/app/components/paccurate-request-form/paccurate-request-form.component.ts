import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {BaseForm} from "../../shared/BaseForm";

@Component({
  selector: "app-paccurate-request-form",
  templateUrl: "./paccurate-request-form.component.html",
  styleUrls: ["./paccurate-request-form.component.scss"]
})
export class PaccurateRequestFormComponent extends BaseForm implements OnInit {

  form: FormGroup;

  constructor(private fB: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fB.group({
      itemSets: this.fB.array([this.newItemSet()]),
      boxTypes: this.fB.array([this.newBoxType()])
    });
    this.exposeControls();
  }

  submit() {
    console.log(this.form.value);
  }

  private newItemSet(): FormGroup {
    return this.fB.group({
      refId: [0],
      color: [""],
      weight: [0],
      dimensions: this.fB.group({
        x: [0],
        y: [0],
        z: [0]
      }),
      quantity: [0],
      name: [""]
    });
  }

  private newBoxType(): FormGroup {
    return this.fB.group({
      weightMax: [0],
      name: [""],
      dimensions: this.fB.group({
        x: [0],
        y: [0],
        z: [0]
      })
    });
  }

  getItemSetsControls(form) {
    return <FormArray>form.get("itemSets").controls;
  }

  addItemSet() {
    (<FormArray>this.form.get("itemSets")).push(this.newItemSet());
  }

  removeItemSet(index: number) {
    (<FormArray>this.form.get("itemSets")).removeAt(index);
  }

  getBoxTypesControls(form) {
    return <FormArray>form.get("boxTypes").controls;
  }

  addBoxType() {
    (<FormArray>this.form.get("boxTypes")).push(this.newBoxType());
  }

  removeBoxType(index: number) {
    (<FormArray>this.form.get("boxTypes")).removeAt(index);
  }
}
