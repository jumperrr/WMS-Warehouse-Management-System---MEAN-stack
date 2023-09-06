import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HelperService } from 'src/app/services/helper.service';

declare var bootstrap: any;

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent {
  statusID: any;

  statusForm: any = {
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
      this.statusID = params.get('id');
      if (this.statusID != null && this.statusID != undefined && this.statusID != 'new') {
        this.getStatus(this.statusID);
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

  getStatus(id: string) {
    this.dataService.getStatusById(id).subscribe({
      next: data => {
        this.statusForm.name = data.name;
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
        this.navigateTo('/statuslist')
      },
    })
  }

  updateStatus() {
    this.statusForm._id = this.statusID;
    this.dataService.updateStatus(this.statusForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
      },
      error: err => {
        this.helperService.showToast('error', err.error.message);
      },
    })
  }

  addStatus() {
    this.dataService.addStatus(this.statusForm).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/status/' + data.data._id)
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  deleteStatus() {
    this.dataService.deleteStatusById(this.statusID).subscribe({
      next: data => {
        this.helperService.showToast('success', data.message);
        this.navigateTo('/statuslist');
      },
      error: err => {
        this.helperService.showToast('error', err.error.message)
      },
    })
  }

  onSubmit() {
    if (this.statusID == "new") {
      this.addStatus();
    } else {
      this.updateStatus();
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
