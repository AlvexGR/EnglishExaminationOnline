import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  private _isLoading: boolean;
  private _loadingObservable: BehaviorSubject<boolean>;

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
    this._loadingObservable.next(this._isLoading);
  }

  get loadingObservable(): Observable<boolean> {
    return this._loadingObservable.asObservable();
  }

  constructor() {
    this._loadingObservable = new BehaviorSubject<boolean>(this._isLoading);
  }
}
