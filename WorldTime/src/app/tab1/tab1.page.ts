import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {TimesService} from '../api/times.service'


interface Misto
{
  loca:string,
  time:string,
  date:string
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  ListData = [];

  MojeMisto:Misto = {
    loca: '',
    time: '',
    date: ''
  };
  locations:Misto[] = [];
  refresh = new BehaviorSubject<boolean>(true);
  


  constructor(private timeService: TimesService) 
  {
    timeService.storageINIT();
    this.GetMyTime();
    this.loadData();
  }

  private GetMyTime()
  {
    this.timeService.GetMyTime().subscribe((data) => 
    {
      this.MojeMisto.loca = data.timezone.split("/")[1];
      this.MojeMisto.time = data.datetime.slice(0,10);
      this.MojeMisto.date = data.datetime.slice(11,19);
    }
    );
  }

  async loadData()
  {
    this.ListData = await this.timeService.GetData();
      console.log("nalezena mesta");
      this.locations = [];
      this.ListData.forEach(element => {
      this.timeService.GetInfo(element).subscribe(async (data) => 
        {
          const Mesto:Misto = {
            loca: '',
            time: '',
            date: ''
          }
          Mesto.loca = data.timezone.split("/")[1];
          Mesto.time = data.datetime.slice(0,10);
          Mesto.date = data.datetime.slice(11,19);
          await this.locations.push(Mesto);
        }
      );
    });
    console.log(this.locations);
  }

  async removeItem(index)
  {
    console.log(this.locations[index]);
    await this.timeService.removeItem(index);
    this.loadData();
  }

  async AddMesto()
  {
    await this.timeService.addData("http://worldtimeapi.org/api/ip");
    this.loadData();
  }

}
