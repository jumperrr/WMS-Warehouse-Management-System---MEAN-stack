import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {

  supplierID: any;
  allProducts: any;
  supplierProducts: any = [];
  productTemp = "";

  supplierForm: any = {
    name: null,
    address: null,
    nip: null,
    email: null,
    phoneNumber: null,
    products: [],
    _id: null
  }

  toastMessageSuccess = "";
  toastMessageError = "";

  confirmationModal: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.supplierID = params.get('id');
      if (this.supplierID != null && this.supplierID != undefined && this.supplierID != 'new') {
        this.getSupplier(this.supplierID);
      }
    });

    this.getAllProducts();
  }

  ngOnDestroy() {
    if (this.confirmationModal != undefined) {
      this.confirmationModal.dispose();
      this.renderer.removeClass(document.body, "modal-open");
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "padding-right");
    }
  }

  getAllProducts() {
    this.dataService.getAllProducts().subscribe({
      next: data => {
        this.allProducts = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  getSupplier(id: string) {
    this.dataService.getSupplierById(id).subscribe({
      next: data => {
        this.supplierForm.name = data.name;
        this.supplierForm.address = data.address;
        this.supplierForm.nip = data.nip;
        this.supplierForm.email = data.email;
        this.supplierForm.phoneNumber = data.phoneNumber;

        if (data.products.length != 0) {
          this.supplierProducts = data.products;
          this.supplierProducts.forEach((product: any) => {
            this.supplierForm.products.push({ product: product.product._id })
          });
        }
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/supplierlist')
      },
    })
  }

  updateSupplier() {
    this.supplierForm._id = this.supplierID;
    this.dataService.updateSupplier(this.supplierForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addSupplier() {
    this.dataService.addSupplier(this.supplierForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/supplier/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteSupplier() {
    this.dataService.deleteSupplierById(this.supplierID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/supplierlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.supplierID == "new") {
      this.addSupplier();
    } else {
      this.updateSupplier();
    }
  }

  addProductToSupplier(product: any) {
    var addedAlready = this.supplierProducts.find((obj: any) => obj.product._id === product);
    if (addedAlready == undefined) {
      let index = this.allProducts.map((p: any) => p._id).indexOf(product);
      if (index > -1) {
        let p = {
          product: this.allProducts[index]
        }
        this.supplierProducts.push(p);
      }
      this.supplierForm.products.push({
        product: product
      });
    } else {
      this.helperService.showToast('error', "The product has already been added")
    }
  }

  deleteProduct(index: any) {
    let id = this.supplierProducts[index].product._id;
    let id2 = this.supplierForm.products.map((p: any) => p.product).indexOf(id);
    if (id2 > -1) {
      this.supplierForm.products.splice(id2, 1)
    }
    this.supplierProducts.splice(index, 1);
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

