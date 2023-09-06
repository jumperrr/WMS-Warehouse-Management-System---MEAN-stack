import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.scss']
})
export class WarehouseFormComponent {

  warehouseID: any;

  warehouseForm: any = {
    name: null,
    _id: null
  }

  confirmationModal: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.warehouseID = params.get('id');
      if (this.warehouseID != null && this.warehouseID != undefined && this.warehouseID != 'new') {
        this.getWarehouse(this.warehouseID);
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

  getWarehouse(id: string) {
    this.dataService.getWarehouseById(id).subscribe({
      next: data => {
        this.warehouseForm.name = data.name;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/warehouselist')
      },
    })
  }

  updateWarehouse() {
    this.warehouseForm._id = this.warehouseID;
    this.dataService.updateWarehouse(this.warehouseForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addWarehouse() {
    this.dataService.addWarehouse(this.warehouseForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/warehouse/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteWarehouse() {
    this.dataService.deleteWarehouseById(this.warehouseID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/warehouselist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.warehouseID == "new") {
      this.addWarehouse();
    } else {
      this.updateWarehouse();
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
