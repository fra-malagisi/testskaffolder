// Import Libraries
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Import Services
import { ImmobileService } from '../../services/immobile.service';

// Import Models
import { Immobile } from '../../domain/maeci_db/immobile';

// START - USED SERVICES
/*
 *	ImmobileService.create
 *		PARAMS: 
 *		
 *
 *	ImmobileService.get
 *		PARAMS: 
 *		
 *
 *	ImmobileService.update
 *		PARAMS: 
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * ImmobileService  
 */
// END - REQUIRED RESOURCES

/**
 * Edit component for ImmobileEdit
 */
@Component({
    selector: 'immobile-edit',
    templateUrl : './immobile-edit.component.html',
    styleUrls: ['./immobile-edit.component.css']
})
export class ImmobileEditComponent implements OnInit {

    item: Immobile;
    model: Immobile;
    
    constructor(
        private immobileService: ImmobileService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init item
        this.item = new Immobile();
    }

    ngOnInit(): void {
            this.route.params.subscribe(param => {
                let id: string = param['id'];
                if (id !== 'new') {
                    // Get item from server 
                    this.immobileService.get(id).subscribe(item => this.item = item);
                }
            });
    }

    /**
     * Save Item
     */
    save (formValid:boolean, item: Immobile): void{
        if (formValid) {
            if(item._id){
                this.immobileService.update(item).subscribe(data => this.goBack());
            } else {
                this.immobileService.create(item).subscribe(data => this.goBack());
            }  
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }
    

}