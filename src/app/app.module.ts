import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {PaccurateRequestFormComponent} from "./components/paccurate-request-form/paccurate-request-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaccurateResponseViewComponent} from "./components/paccurate-response-view/paccurate-response-view.component";
import {PaccurateService} from "./services/paccurate.service";
import {HttpClientModule} from "@angular/common/http";
import {PrimengImportModule} from "./primeng.import";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GrowlService} from "./services/growl.service";
import {ThreeJsComponent} from "./three-js/three-js.component";

@NgModule({
  declarations: [
    AppComponent,
    PaccurateRequestFormComponent,
    PaccurateResponseViewComponent,
    ThreeJsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PrimengImportModule,
  ],
  providers: [
    PaccurateService,
    GrowlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
