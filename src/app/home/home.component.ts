import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataOrigen: any = []
  dataDestino: any = []
  itemOrigen: any = { id: null, name: 'Moneda origen', value: "0" };
  itemDestino: any = { id: null, name: 'Moneda destino', value: "0" };
  mount: number;
  result: string = "";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(environment.url + '/list').subscribe(res => {
      console.log(res);
      this.dataOrigen = res;
      this.dataDestino = res;
    })
  }

  toggle = (e) => {
    e.classList.toggle("active");

  }

  selectOrigen = (combo, item) => {
    this.itemOrigen = item;
    combo.classList.toggle("active");
  }

  selectDestino = (combo, item) => {
    this.itemDestino = item;
    combo.classList.toggle("active");
  }

  consultar() {
    console.log(this.itemOrigen.id, this.mount, this.itemDestino.id);
    this.http.get(environment.url + `/change/${this.itemOrigen.id}/${this.mount}/${this.itemDestino.id}`).subscribe(res => {
      console.log(res);
      this.result = `Valor en ${this.itemDestino.name}: ${res['money']} y el tipo de cambio es: ${res['change']}`;
    })
  }

}
