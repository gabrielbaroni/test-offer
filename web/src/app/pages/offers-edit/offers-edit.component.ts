import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-offers-edit',
  templateUrl: './offers-edit.component.html',
  styleUrls: ['./offers-edit.component.scss']
})
export class OffersEditComponent implements OnInit {

  public formOffers: FormGroup;
  public submitted = false;
  public characters: any;
  public idOffer: any;
  public offer: any;

  constructor(
    private fb: FormBuilder,
    private service: OffersService,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idOffer = this.activatedRoute.snapshot.params['id'];

    this.getOffer();

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formOffers = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern(reg)]],
      description: ['', [Validators.max(500)]],
      startsAt: [''],
      endsAt: [''],
      premium: [''],
    })
  }

  get f() {
    return this.formOffers.controls;
  }

  getOffer() {
    this.service.getOffer(this.idOffer).subscribe((result) => {
      this.offer = result.data.content;
      console.log('this.offer', this.offer)
      this.formOffers.get('name')?.setValue(this.offer.name);
      this.formOffers.get('url')?.setValue(this.offer.url);
      this.formOffers.get('description')?.setValue(this.offer.description);
      this.formOffers.get('startsAt')?.setValue(this.offer.startsAt);
      this.formOffers.get('endsAt')?.setValue(this.offer.endsAt);
      this.formOffers.get('premium')?.setValue(this.offer.premium);
    }, e => {
      this.toast.error('Offer not found.');
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.formOffers.valid) {
      this.service.update(this.idOffer, this.formOffers.value).subscribe((result) => {
        this.toast.success(result.data.message);
        this.formOffers.reset();
        this.router.navigate(['/offers']);
      }, e => {
        this.toast.success('Error in updated an offer.');
      })
    } else {}
  }

  onChangeDescription(e: any) {
    this.characters = e.target.value.length;
  }

}
