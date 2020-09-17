import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentsService } from 'src/app/services/establishments/establishments.service';
import { EstablishmentsDTO } from 'src/app/services/establishments/establishments.types';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss'],
})
export class EstablishmentComponent implements OnInit {
  form: FormGroup;
  establishment: EstablishmentsDTO;
  Establishments: EstablishmentsDTO[];
  idEstablishment: string;
  citysNames: string[];
  names: string[];

  constructor(
    private establishmentsService: EstablishmentsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cacheService: CacheService
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      address: [null],
      registered: [null],
      email: [null],
      phone: [null],
      latitude: [null],
      longitude: [null],
    });
  }

  ngOnInit(): void {
    this.idEstablishment = this.activatedRoute.snapshot.params.id;
    this._getEstablishment();
    this._getCitys();
    this._getNames();
  }

  private async _getEstablishment(): Promise<void> {
    if (!this.cacheService.getCache().get('establishments')) {
      this.establishment = await this.establishmentsService.get(
        this.idEstablishment
      );
      console.log(this.establishment);
    } else {
      this.Establishments = this.cacheService.getCache().get('establishments');
      this.establishment = this.Establishments.find(
        (x) => x.id === this.idEstablishment
      );
    }
    this.handleSetValues(this.establishment);
  }

  private _saveEstablishment(): void {
    if (this.form.invalid) {
      return;
    }

    const data: EstablishmentsDTO = {
      address: this.form.value.address,
      email: this.form.value.email,
      name: this.form.value.name,
      registered: this.form.value.registered,
      phone: this.form.value.phone,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude,
      guid: this.establishment.guid,
      id: this.establishment.id,
      index: this.establishment.index,
      picture: this.establishment.picture,
    };

    this.Establishments = this.Establishments.map((x) => {
      if (x.id === data.id) {
        x = data;
      }
      return x;
    });

    this.cacheService
      .getCache()
      .set('establishments', this.Establishments, 10000);

    this.establishment = data;
  }

  private async _getCitys(): Promise<void> {
    const citys = await this.establishmentsService.getAll();

    this.citysNames = citys.map((x) => x.address.split(',')[2]);
  }

  private async _getNames(): Promise<void> {
    const citys = await this.establishmentsService.getAll();

    this.names = citys.map((x) => x.name);
  }

  handleSetValues(establishment: EstablishmentsDTO): void {
    this.form.controls.name.setValue(establishment.name);
    this.form.controls.address.setValue(establishment.address);
    this.form.controls.registered.setValue(establishment.registered);
    this.form.controls.email.setValue(establishment.email);
    this.form.controls.phone.setValue(establishment.phone);
    this.form.controls.latitude.setValue(establishment.latitude);
    this.form.controls.longitude.setValue(establishment.longitude);
  }

  handleEstablishments(): void {
    this.router.navigate(['/establishments']);
  }

  handleSaveEstablishment(): void {
    this._saveEstablishment();
  }
}
