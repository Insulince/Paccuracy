import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PaccurateRequest, PaccurateResponse} from "../model/model";
import {API_ENDPOINT, API_KEY} from "../app.constants";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PaccurateService {
  private paccurateResponseSub: Subject<PaccurateResponse> = new Subject<PaccurateResponse>();
  paccurateResponseObs = this.paccurateResponseSub.asObservable();

  private paccurateRequestSubmittedSub: Subject<void> = new Subject<void>();
  paccurateRequestSubmittedObs = this.paccurateRequestSubmittedSub.asObservable();

  private paccurateFormToggledSub: Subject<boolean> = new Subject<boolean>();
  paccurateFormToggledObs = this.paccurateFormToggledSub.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  submitPackingRequest(paccurateRequest: PaccurateRequest): Observable<PaccurateResponse> {
    return this.httpClient.post<PaccurateResponse>(
      API_ENDPOINT,
      paccurateRequest,
      {
        headers: new HttpHeaders()
          .set("Content-Type", "application/json")
          .set("authorization", `apikey ${API_KEY}`)
      }
    );
  }

  emitPaccurateRequestSubmitted(): void {
    this.paccurateRequestSubmittedSub.next();
  }

  emitPaccurateResponse(response: PaccurateResponse): void {
    this.paccurateResponseSub.next(response);
  }

  emitFormToggled(toggled: boolean): void {
    this.paccurateFormToggledSub.next(toggled);
  }
}
