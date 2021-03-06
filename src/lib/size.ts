import { Observable } from 'rxjs';

import Endpoint from './common/endpoint';
import { ICollection } from './common/interfaces';
import { ISize, ISizeEndpoint } from './common/interfaces';
import { isSize } from './common/type.guards';
import DigitalOcean from './digitalOcean';

/**
 * Size endpoint.
 *
 * @class SizeEndpoint
 * @extends {Endpoint}
 * @implements {ISizeEndpoint}
 */
export default class SizeEndpoint extends Endpoint implements ISizeEndpoint {
    /**
     * Creates an instance of SizeEndpoint.
     * @param {DigitalOcean} digitalOcean
     *
     * @memberof SizeEndpoint
     */
    constructor(digitalOcean: DigitalOcean) {
        super(digitalOcean, '/sizes');
    }
    /**
     * List all sizes.
     *
     * @param {number} page
     * @param {number} [perPage]
     * @returns {Observable<ICollection<ISize>>}
     *
     * @memberof SizeEndpoint
     */
    list(page: number, perPage?: number): Observable<ICollection<ISize>> {
        const url: string = this.prefix;
        return this.getCollection<ISize>(page, perPage, url, 'sizes', isSize);
    }
}
