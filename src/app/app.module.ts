import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {PaccurateRequestFormComponent} from "./components/paccurate-request-form/paccurate-request-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimengImportModule} from "./primeng.import";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    PaccurateRequestFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengImportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
