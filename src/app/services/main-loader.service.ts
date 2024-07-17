import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainLoaderService {
  isLoading = new BehaviorSubject<boolean>(false);

  getIsLoading() {
    return this.isLoading.asObservable();
  }

  setIsLoading(state: boolean) {
    this.isLoading.next(state);
  }
}