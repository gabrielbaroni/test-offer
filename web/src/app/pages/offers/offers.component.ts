import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  public offers: any = [];
  constructor(
    private service: OffersService,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.service.getOffers().subscribe((result) => {
      this.offers = result.data.content;
    }, e => {
    })
  }

  onRemove(idOffer: number) {
    this.service.delete(idOffer).subscribe((result) => {
      this.toast.success(result.data.message);
      this.getOffers();
    }, e => {
      this.getOffers();
    })
  }

  async onUpdateStatus(idOffer: number, status: any) {
    let statusOffer: any;
    statusOffer = status ? false : true;

    this.service.patchStatus(idOffer, statusOffer).subscribe((result) => {
      this.toast.success(result.data.message);
      this.getOffers();
    }, e => {
      this.getOffers();
    })
  }
}
