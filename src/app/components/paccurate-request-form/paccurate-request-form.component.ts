import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {BaseForm} from "../../shared/BaseForm";
import {PaccurateRequest, PaccurateResponse} from "../../model/model";
import {PaccurateService} from "../../services/paccurate.service";

@Component({
  selector: "app-paccurate-request-form",
  templateUrl: "./paccurate-request-form.component.html",
  styleUrls: ["./paccurate-request-form.component.scss"]
})
export class PaccurateRequestFormComponent extends BaseForm implements OnInit {

  form: FormGroup;

  constructor(private fB: FormBuilder,
              private paccurateService: PaccurateService) {
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
    const paccurateReq: PaccurateRequest = new PaccurateRequest(this.form.value.itemSets, this.form.value.boxTypes, false);
    this.paccurateService.submitPackingRequest(paccurateReq)
      .subscribe((response: PaccurateResponse) => {
        this.paccurateService.emitPaccurateResponse(response);
      });
  }

  private newItemSet(): FormGroup {
    return this.fB.group({
      refId: [],
      color: [""],
      weight: [],
      dimensions: this.fB.group({
        x: [],
        y: [],
        z: []
      }),
      quantity: [],
      name: []
    });
  }

  private newBoxType(): FormGroup {
    return this.fB.group({
      weightMax: [],
      name: [],
      dimensions: this.fB.group({
        x: [],
        y: [],
        z: []
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
