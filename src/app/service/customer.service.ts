import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiurl = "https://64cc86e22eafdcdc8519ed83.mockapi.io/Employee/Customer";

  constructor(private http: HttpClient) { }
  LoadCustomer() {
    return this.http.get(this.apiurl);
  }

  SaveCustomer(customerdata:any) {
    return this.http.post(this.apiurl,customerdata);
  }
  LoadCustomerbycode(id:any) {
    return this.http.get(this.apiurl+'/'+id);
  }
  
  RemoveCustomer(id:any) {
    return this.http.delete(this.apiurl+'/'+id);
  }
  UpdateCustomer(id: any, customerdata: any) {
    return this.http.put(`${this.apiurl}/${id}`, customerdata);
  }
}
