import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

const StorageKey = 'Cities';
const Mista = "Places"


@Injectable({
  providedIn: 'root'
})
export class TimesService {
  data:any;

  constructor(private http: HttpClient, private storage: Storage) { this.storageINIT;}

  public GetMyTime()
  {
    return this.GetInfo("http://worldtimeapi.org/api/ip")
  }

  public GetInfo(web:string)
  {
    this.data = this.http.get(web);
    if(this.data == null)
    {
      return this.GetMyTime();
    }
    return this.data;
  }

  public storageINIT()
  {
    this.storage.create();
  }

  public GetData()
  {
    return this.storage.get(StorageKey) || [];
  }

  async addData(item)//item je html stranka
  {
    const storageData = await this.storage.get(StorageKey) || [];
    storageData.push(item);
    return this.storage.set(StorageKey,storageData);
  }

  async removeItem(index)
  {
    const storageData = await this.storage.get(StorageKey) || [];
    storageData.splice(index,1);
    return this.storage.set(StorageKey,storageData);
  }
}
