import {NgModule} from "@angular/core";
import {ColorPickerModule} from "primeng/colorpicker";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {GrowlModule} from "primeng/growl";
import {TableModule} from "primeng/table";
import {TabViewModule} from "primeng/tabview";
import {PanelModule} from "primeng/panel";

@NgModule({
  imports: [
    ColorPickerModule,
    ProgressSpinnerModule,
    TableModule,
    TabViewModule,
    PanelModule,
    GrowlModule
  ],
  exports: [
    ColorPickerModule,
    ProgressSpinnerModule,
    TableModule,
    TabViewModule,
    PanelModule,
    GrowlModule
  ]
})
export class PrimengImportModule {

}
