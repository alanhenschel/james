import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstablishmentsDTO } from 'src/app/services/establishments/establishments.types';

@Component({
  selector: 'app-establishment-item',
  templateUrl: './establishment-item.component.html',
  styleUrls: ['./establishment-item.component.css'],
})
export class EstablishmentItemComponent {
  @Input()
  establishment: EstablishmentsDTO;

  constructor(private router: Router) {}

  get image(): string {
    return this.establishment?.picture;
  }

  get name(): string {
    return this.establishment?.name;
  }

  get address(): string {
    return this.establishment?.address;
  }

  get index(): number {
    return this.establishment?.index;
  }

  get city(): string {
    return this.establishment?.address.split(',')[2];
  }

  handleNavigate(): void {
    this.router.navigate(['/establishments', this.establishment.id]);
  }
}
