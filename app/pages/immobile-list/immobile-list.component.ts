// Import Libraries
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ModalRemoveComponent } from '../../components/modal-remove.component';


// Import Services
import { ImmobileService } from '../../services/immobile.service';

// Import Models
import { Immobile } from '../../domain/maeci_db/immobile';

// START - USED SERVICES
/*
 *	ImmobileService.delete
 *		PARAMS: 
 *		
 *
 *	ImmobileService.list
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

@Component({
    selector: "immobile-list",
    templateUrl: './immobile-list.component.html',
    styleUrls: ['./immobile-list.component.css']
})
export class ImmobileListComponent implements OnInit {
    
    // Attributes
    list: Immobile[];
    search: any = {};
    idSelected: string;
    
    // Constructor
    constructor(
        private immobileService: ImmobileService, 
        public dialog: MatDialog) {}

    // Functions
    ngOnInit(): void {
        this.immobileService.list().subscribe(list => this.list = list);
    }

    openModal(id: string): void {
        let dialogRef = this.dialog.open(ModalRemoveComponent, {
            width: '250px',
            data: () => {
                // Execute on confirm
                this.immobileService.remove(id).subscribe(() => {
                    dialogRef.close();
                });
                this.list = this.list.filter(item => item._id != id);
            }
        });
    }

}