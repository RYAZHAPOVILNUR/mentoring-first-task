import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LocalStorageAct {
  private readonly storageKey = 'users-list';

  public setItem(value: string): void {
    localStorage.setItem(this.storageKey, value);
  }

  public getItem(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  public removeItem(): void {
    localStorage.removeItem(this.storageKey);
  }
}
