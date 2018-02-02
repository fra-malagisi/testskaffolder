// DEPENDENCIES
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// SECURITY
import { AuthenticationService } from '../security/authentication.service';

// CONFIG
import { config } from "../../config/properties";

// MODEL
import { ImmobileBaseService } from "./base/immobile.base.service";
import { Immobile } from '../domain/maeci_db/immobile';

/**
 * YOU CAN OVERRIDE HERE ImmobileBaseService
 */

@Injectable()
export class ImmobileService extends ImmobileBaseService {
    
    // CONSTRUCTOR
    constructor(http: Http, authenticationService: AuthenticationService) {
            super(http, authenticationService);
    }
}