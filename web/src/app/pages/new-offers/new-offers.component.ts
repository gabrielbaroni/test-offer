import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  public formOffers: FormGroup;
  public submitted = false;
  public characters: any;

  constructor(
    private fb: FormBuilder,
    private service: OffersService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
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

  onSubmit() {
    this.submitted = true;

    if (this.formOffers.valid) {
      this.service.create(this.formOffers.value).subscribe((result) => {
        this.toast.success(result.data.message);
        this.formOffers.reset();
        this.router.navigate(['/offers']);
      }, e => {
        this.toast.success('Error in create an offer.');
      })
    } else {
      console.log('F ', this.f);
      console.log(this.formOffers)
    }
  }

  onChangeDescription(e: any) {
    this.characters = e.target.value.length;
  }

}
