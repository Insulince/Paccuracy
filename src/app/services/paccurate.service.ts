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

  emitPaccurateResponse(response: PaccurateResponse): void {
    this.paccurateResponseSub.next(response);
  }
}
