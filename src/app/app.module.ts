import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {PaccurateRequestFormComponent} from "./components/paccurate-request-form/paccurate-request-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaccurateResponseViewComponent} from "./components/paccurate-response-view/paccurate-response-view.component";
import {PaccurateService} from "./services/paccurate.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PaccurateRequestFormComponent,
    PaccurateResponseViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PaccurateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
