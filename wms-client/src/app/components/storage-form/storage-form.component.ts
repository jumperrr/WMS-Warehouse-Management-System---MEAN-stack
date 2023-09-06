import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-storage-form',
  templateUrl: './storage-form.component.html',
  styleUrls: ['./storage-form.component.scss']
})
export class StorageFormComponent {

  storageID: any;

  storageForm: any = {
    name: null,
    _id: null,
    warehouse: "",
    area: ""
  }

  warehouses: any;
  areas: any;
  areasFiltered: any;

  confirmationModal: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
      this.getAllWarehouses();
      this.getAllAreas();

      this.route.paramMap.subscribe(params => {
      this.storageID = params.get('id');
      if (this.storageID != null && this.storageID != undefined && this.storageID != 'new') {
        this.getStorage(this.storageID);
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

  getAllWarehouses() {
    this.dataService.getAllWarehouses().subscribe({
      next: data => {
        this.warehouses = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getAllAreas() {
    this.dataService.getAllAreas().subscribe({
      next: data => {
        this.areas = data;
        this.areasFiltered = data;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      }
    })
  }

  getStorage(id: string) {
    this.dataService.getStorageById(id).subscribe({
      next: data => {
        this.storageForm.name = data.name;
        this.storageForm.area = data.area._id;
        this.storageForm.warehouse = data.area.warehouse._id;
        this.filterAreas();
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/storagelist')
      },
    })
  }

  updateStorage() {
    this.storageForm._id = this.storageID;
    this.dataService.updatStorage(this.storageForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addStorage() {
    this.dataService.addStorage(this.storageForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/storage/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteStorage() {
    this.dataService.deleteStorageById(this.storageID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/storagelist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.storageID == "new") {
      this.addStorage();
    } else {
      this.updateStorage();
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

  filterAreas() {
    if (this.storageForm.warehouse.length == 0) {
      this.areasFiltered = this.areas;
    } else if (this.storageForm.warehouse.length != 0) {
      this.areasFiltered = this.areas.filter((a: any) => a.warehouse._id === this.storageForm.warehouse);
    }
  }
}
