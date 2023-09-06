import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent {

  areaID: any;

  areaForm: any = {
    name: null,
    _id: null,
    warehouse: null,
  }

  warehouses: any;

  confirmationModal: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private helperService: HelperService,
    private renderer: Renderer2,
    private dataService: DataService) {
    this.route.paramMap.subscribe(params => {
      this.areaID = params.get('id');
      if (this.areaID != null && this.areaID != undefined && this.areaID != 'new') {
        this.getArea(this.areaID);
      }
    });

    this.getAllWarehouses();
  }

  ngOnDestroy() {
    if (this.confirmationModal != undefined) {
      this.confirmationModal.dispose();
      this.renderer.removeClass(document.body, "modal-open");
      this.renderer.removeStyle(document.body, "overflow");
      this.renderer.removeStyle(document.body, "padding-right");
    }
  }

  getArea(id: string) {
    this.dataService.getAreaById(id).subscribe({
      next: data => {
        this.areaForm.name = data.name;
        this.areaForm.warehouse = data.warehouse._id
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/arealist')
      },
    })
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

  updateArea() {
    this.areaForm._id = this.areaID;
    this.dataService.updateArea(this.areaForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addArea() {
    this.dataService.addArea(this.areaForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/area/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteArea() {
    this.dataService.deleteAreaById(this.areaID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/arealist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.areaID == "new") {
      this.addArea();
    } else {
      this.updateArea();
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
