import { Injectable } from '@angular/core';
import * as nodeCache from 'node-cache';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache: nodeCache;

  constructor() {
    this.cache = new nodeCache();
  }

  getCache(): nodeCache {
    return this.cache;
  }
}
