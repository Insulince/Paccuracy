import {NgModule} from "@angular/core";
import {ColorPickerModule} from "primeng/colorpicker";
import {ProgressSpinnerModule} from "primeng/primeng";
import {GrowlModule} from "primeng/growl";

@NgModule({
  imports: [
    ColorPickerModule,
    ProgressSpinnerModule,
    GrowlModule
  ],
  exports: [
    ColorPickerModule,
    ProgressSpinnerModule,
    GrowlModule
  ]
})
export class PrimengImportModule {

}
