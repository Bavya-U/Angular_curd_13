import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomerService } from "../service/customer.service";
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {
  messageclass = ''
  message = ''
  customerid: any;
  editdata: any;

  constructor(private service: CustomerService, private route: ActivatedRoute) {
    this.customerid = this.route.snapshot.paramMap.get('id');
    if (this.customerid != null) {
      this.UpdateCustomer(this.customerid);
    }
  }

  ngOnInit(): void {}

  register = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    phoneno: new FormControl("", Validators.required),
    dob: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
  });

 
  onSubmit() {
    if (this.register.valid) {
      if (this.customerid == null) {
        this.service.SaveCustomer(this.register.value).subscribe(result => {
          if (result != null) {
            this.message = "Customer saved successfully";
            this.messageclass = "success";
            this.ClearCustomer();
          }
        });
      } else {
        // Update existing customer
        this.service.UpdateCustomer(this.customerid, this.register.value).subscribe(result => {
          if (result != null) {
            this.message = "Customer updated successfully";
            this.messageclass = "success";
            this.ClearCustomer();
          }
        });
      }
    } else {
      this.message = "Please enter valid data";
      this.messageclass = "error";
    }
  }
  


  ClearCustomer() {
    this.register.reset();
  }

  UpdateCustomer(id: any) {
    this.service.LoadCustomerbycode(id).subscribe(data => {
      this.editdata = data;
      this.register.patchValue({
        name: this.editdata.name,
        email: this.editdata.email,
        phoneno: this.editdata.phoneno,
        dob: this.editdata.dob,
        gender: this.editdata.gender
      });
    });
  }
}
