import { Component, OnInit } from '@angular/core';
import { EstablishmentsService } from '../../services/establishments/establishments.service';
import { CacheService } from '../../services/cache/cache.service';
import { EstablishmentsDTO } from '../../services/establishments/establishments.types';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css'],
})
export class EstablishmentsComponent implements OnInit {
  constructor(
    private establishmentsService: EstablishmentsService,
    private cacheService: CacheService
  ) {}

  EstablishmentsList: Array<EstablishmentsDTO>;

  ngOnInit(): void {
    this._getEstablishmentsList();
  }

  private async _getEstablishmentsList(): Promise<void> {
    if (!this.cacheService.getCache().get('establishments')) {
      this.EstablishmentsList = await this.establishmentsService.getAll();
      this.cacheService
        .getCache()
        .set('establishments', this.EstablishmentsList, 10000);

      console.log(this.cacheService.getCache().get('establishments'));
    } else {
      this.EstablishmentsList = this.cacheService
        .getCache()
        .get('establishments');
    }
  }
}
