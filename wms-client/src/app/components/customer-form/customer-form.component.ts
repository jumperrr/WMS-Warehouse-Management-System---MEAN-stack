import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {

  customerID: any;
  customerForm: any = {
    name: null,
    address: null,
    nip: null,
    duns: null,
    email: null,
    phoneNumber: null,
    _id: null,
  }

  confirmationModal: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.customerID = params.get('id');
      if (this.customerID != null && this.customerID != undefined && this.customerID != 'new') {
        this.getCustomer(this.customerID);
      }
    });
  }

  ngOnDestroy() {
    if (this.confirmationModal != undefined) {
      this.confirmationModal.dispose();
      this.renderer.removeClass(document.body, "modal-open");
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "padding-right");
    }
  }

  getCustomer(id: string) {
    this.dataService.getCustomerById(id).subscribe({
      next: data => {
        this.customerForm.name = data.name;
        this.customerForm.address = data.address;
        this.customerForm.nip = data.nip;
        this.customerForm.duns = data.duns;
        this.customerForm.email = data.email;
        this.customerForm.phoneNumber = data.phoneNumber;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/customerlist')
      },
    })
  }

  updateCustomer() {
    this.customerForm._id = this.customerID;
    this.dataService.updateCustomer(this.customerForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addCustomer() {
    this.dataService.addCustomer(this.customerForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/customer/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteCustomer() {
    this.dataService.deleteCustomerById(this.customerID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/customerlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.customerID == "new") {
      this.addCustomer();
    } else {
      this.updateCustomer();
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  openModal(id: string) {
    var modalDelationEl = document.getElementById(id);
    this.confirmationModal = new bootstrap.Modal(modalDelationEl, {
      keyboard: true
    });
    this.confirmationModal.show();
  }
}
