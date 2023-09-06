import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productID: any;

  productForm: any = {
    name: null,
    unit: "",
    _id: null
  }

  units: any;

  confirmationModal: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.productID = params.get('id');
      if (this.productID != null && this.productID != undefined && this.productID != 'new') {
        this.getProduct(this.productID);
      }
    });

    this.getAllUnits();
  }

  ngOnDestroy() {
    if (this.confirmationModal != undefined) {
      this.confirmationModal.dispose();
      this.renderer.removeClass(document.body, "modal-open");
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "padding-right");
    }
  }

  getAllUnits() {
    this.dataService.getAllUnits().subscribe({
      next: data => {
        this.units = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  getProduct(id: string) {
    this.dataService.getProductById(id).subscribe({
      next: data => {
        this.productForm.name = data.name;
        this.productForm.unit = data.unit._id;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/productlist')
      },
    })
  }

  updateProduct() {
    this.productForm._id = this.productID;
    this.dataService.updateProduct(this.productForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addProduct() {
    this.dataService.addProduct(this.productForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/product/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteProduct() {
    this.dataService.deleteProductById(this.productID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/productlist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.productID == "new") {
      this.addProduct();
    } else {
      this.updateProduct();
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
