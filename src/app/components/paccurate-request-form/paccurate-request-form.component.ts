import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {BaseForm} from "../../shared/BaseForm";
import {PaccurateRequest, PaccurateResponse} from "../../model/model";
import {PaccurateService} from "../../services/paccurate.service";
import "rxjs/add/observable/merge";

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
  }

  submit() {
    const paccurateReq: PaccurateRequest = new PaccurateRequest(this.form.value.itemSets, this.form.value.boxTypes, true);
    this.paccurateService.emitPaccurateRequestSubmitted();
    this.paccurateService.submitPackingRequest(paccurateReq).subscribe(
      (response: PaccurateResponse) => {
        this.paccurateService.emitPaccurateResponse(response);
      }
    );
  }

  private newItemSet(): FormGroup {
    return this.fB.group({
      refId: [this.genRefId()],
      color: [this.genHex()],
      weight: [],
      dimensions: this.fB.group({
        x: [],
        y: [],
        z: []
      }),
      quantity: [],
      name: [this.genName("itemSets")]
    });
  }

  private newBoxType(): FormGroup {
    return this.fB.group({
      weightMax: [],
      name: [this.genName("boxTypes")],
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

  private genRefId(): number {
    return Math.floor(Math.random() * (999 - 100) + 100);
  }

  private genHex(): string {
    return "#" + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
  }

  private genName(controlName: string): string {
    return `${controlName === "itemSets" ? "Item" : "Box"} ${this.form ? (<FormArray>this.form.get(controlName)).controls.length + 1 : 1}`;
  }
}
