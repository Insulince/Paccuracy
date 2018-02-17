import {NgModule} from "@angular/core";
import {ColorPickerModule} from "primeng/colorpicker";

@NgModule({
  imports: [
    ColorPickerModule
  ],
  exports: [
    ColorPickerModule
  ]
})
export class PrimengImportModule {

}
