import { Observable } from 'rxjs';
/**
 * Header interface
 *
 * @export
 * @interface IHeader
 */
export interface IHeader {
    key: string;
    value: string;
}
/**
 * Axios config interface
 *
 * @export
 * @interface IaxiosConfig
 */
export interface IaxiosConfig {
    baseURL: string;
    timeout: number;
    headers: any;
}
/**
 * Specs to API constructor
 *
 * @export
 * @interface IAPISpecs
 */
export interface IAPISpecs {
    headers: Array<IHeader>;
    host: string;
    prefix: string;
    protocol: 'http' | 'https';
    timeout: number;
    invalidResponse: Error;
}
/**
 * Collection interface [used in paginated responses]
 *
 * @export
 * @interface ICollection
 * @template C
 */
export interface ICollection<C> {
    minPage: number;
    curPage: number;
    maxPage: number;
    perPage: number;
    total: number;
    items: Array<C>;
}
/**
 * Collection request default Params
 *
 * @export
 * @interface ICollectionParams
 */
export interface ICollectionParams {
    page: number;
    per_page: number;
};
/**
 * Resource raw object.
 *
 * @export
 * @interface IResource
 */
export interface IResource {
    resource_id: string;
    resource_type: string;
}

/********************************************/
/**
 * RAW
 */
/**
 * Account raw object
 *
 * @export
 * @interface IAccount
 */
export interface IAccount {
    droplet_limit: number;
    email_verified: boolean;
    email: string;
    floating_ip_limit: number;
    status_message: string;
    status: string;
    uuid: string;
}
/**
 * Size raw object.
 *
 * @export
 * @interface ISize
 */
export interface ISize {
    readonly slug: string;
    readonly available: boolean;
    readonly transfer: number;
    readonly price_monthly: number;
    readonly price_hourly: number;
    readonly memory: number;
    readonly vcpus: number;
    readonly disk: number;
    readonly regions: Array<string>;
}
/**
 * Tag raw object.
 *
 * @export
 * @interface ITag
 */
export interface ITag {
    readonly name: string;
    readonly resources: IResource[];
}
/**
 * Region raw object.
 *
 * @export
 * @interface IRegion
 */
export interface IRegion {
    readonly slug: string;
    readonly name: string;
    readonly sizes: string[];
    readonly available: boolean;
    readonly features: string[];
}
/**
 * Action raw object
 *
 * @export
 * @interface IAction
 */
export interface IAction {
    readonly completed_at: string;
    readonly id: number;
    readonly region_slug: string;
    readonly resource_id: number;
    readonly resource_type: string;
    readonly started_at: string;
    readonly status: string;
    readonly type: string;
}
/**
 * SSH Key raw object.
 *
 * @export
 * @interface ISSHKey
 */
export interface ISSHKey {
    readonly fingerprint: string;
    readonly id: number;
    readonly name: string;
    readonly public_key: string;
}

/**
 * Volume raw object.
 *
 * @export
 * @interface IVolume
 */
export interface IVolume {
    readonly created_at: string;
    readonly description: string;
    readonly droplet_ids: number[];
    readonly id: string;
    readonly name: string;
    readonly region: IRegion; //TODO: change this type
    readonly size_gigabytes: number;
}
/**
 * Snapshot raw object.
 *
 * @export
 * @interface ISnapshot
 */
export interface ISnapshot {
    readonly created_at: string;
    readonly id: string;
    readonly min_disk_size: number;
    readonly name: string;
    readonly regions: string[];
    readonly resource_id: string;
    readonly resource_type: string;
    readonly size_gigabytes: number;
}
/**
 * Specs
 */
/**
 * Tag specs.
 *
 * @export
 * @interface ITagSpecs
 */
export interface ITagSpecs {
    name: string;
}
/**
 * SSH Key specs
 *
 * @export
 * @interface ISSHKeySpecs
 */
export interface ISSHKeySpecs {
    name: string;
    public_key?: string;
}
/**
 * Volume specs.
 *
 * @export
 * @interface IVolumeSpecs
 */
export interface IVolumeSpecs {
    description?: string;
    name: string;
    region?: string;
    size_gigabytes: number;
    snapshot_id?: string;
}
/**
 * ENDPOINTS
 */
/**
 * Account endpoint methods
 *
 * @export
 * @interface IAccountEndpoint
 */
export interface IAccountEndpoint {
    get(): Observable<IAccount>;
}
/**
 * Size endpoint methods.
 *
 * @export
 * @interface ISizeEndpoint
 * @extends {IEndpoint}
 */
export interface ISizeEndpoint {
    list(page: number, perPage?: number): Observable<ICollection<ISize>>;
}
/**
 * Tag endpoint methods.
 *
 * @export
 * @interface ITagEndpoint
 */
export interface ITagEndpoint {
    create(specs: ITagSpecs): Observable<ITag>;
    delete(name: string): Observable<void>;
    get(name: string): Observable<ITag>;
    list(page: number, perPage?: number): Observable<ICollection<ITag>>;
    tagResource(name: string, resouce: IResource): Observable<void>;
    tagResource(name: string, resouceId: number | string, resourcetype: string): Observable<void>;
    tagResource(name: string, resouces: IResource[]): Observable<void>;
    untagResource(name: string, resouce: IResource): Observable<void>;
    untagResource(name: string, resouceId: number | string, resourcetype: string): Observable<void>;
    untagResource(name: string, resouces: IResource[]): Observable<void>;
}
/**
 * Region endpoint methods.
 *
 * @export
 * @interface IRegionEndpoint
 */
export interface IRegionEndpoint {
    list(page: number, perPage?: number): Observable<ICollection<IRegion>>;
}
/**
 * Action endpoint methods
 *
 * @export
 * @interface IActionEndpoint
 */
export interface IActionEndpoint {
    get(id: number): Observable<IAction>;
    list(page: number, perPage?: number): Observable<ICollection<IAction>>;
}
/**
 * SSH Key
 *
 * @export
 * @interface ISSHKeyEndpoint
 * @extends {IEndpoint}
 */
export interface ISSHKeyEndpoint {
    create(specs: ISSHKeySpecs): Observable<ISSHKey>;
    delete(id: number): Observable<void>;
    get(fingerprint: string): Observable<ISSHKey>;
    get(id: number): Observable<ISSHKey>;
    list(page: number, perPage?: number): Observable<ICollection<ISSHKey>>;
    update(fingerprint: string, specs: ISSHKeySpecs): Observable<ISSHKey>;
    update(id: number, specs: ISSHKeySpecs): Observable<ISSHKey>;
}
/**
 * Volume endpoint methods.
 *
 * @export
 * @interface IVolumeEndpoint
 * @extends {IEndpoint}
 */
export interface IVolumeEndpoint {
    attach(id: string, dropletId: number): Observable<IAction>;
    attach(name: string, dropletId: number, region: string): Observable<IAction>;
    create(specs: IVolumeSpecs): Observable<IVolume>;
    createSnapshot(id: string, snapshotName: string): Observable<ISnapshot>;
    delete(id: string): Observable<void>;
    delete(name: string, region?: string): Observable<void>;
    detach(id: string, dropletId: number): Observable<IAction>;
    detach(name: string, dropletId: number, region: string): Observable<IAction>;
    getActionById(volumeId: string, actionId: number): Observable<IAction>;
    get(id: string): Observable<IVolume>;
    list(page: number, perPage?: number): Observable<ICollection<IVolume>>;
    listActions(volumeId: string, page: number, perPage?: number): Observable<ICollection<IAction>>;
    listByName(name: string, region: string, page: number, perPage?: number): Observable<ICollection<IVolume>>;
    listSnapshots(volumeId: string, page: number, perPage?: number): Observable<ICollection<ISnapshot>>;
    resize(id: string, size: number): Observable<IAction>;
}
/**
 * Snapshot endpoint methods.
 *
 * @export
 * @interface ISnapshotEndpoint
 */
export interface ISnapshotEndpoint {
    delete(id: string): Observable<void>;
    get(id: string): Observable<ISnapshot>;
    list(page: number, perPage?: number): Observable<ICollection<ISnapshot>>;
    list(resourceType: string, page: number, perPage?: number): Observable<ICollection<ISnapshot>>;
}