import {EventEmitter, Injectable} from "@angular/core";
import {Message} from "primeng/api";

@Injectable()
export class GrowlService {
  messageAdded: EventEmitter<Message> = new EventEmitter<Message>();

  constructor() {
  }

  add(message: Message): void {
    this.messageAdded.emit(message);
  }
}
