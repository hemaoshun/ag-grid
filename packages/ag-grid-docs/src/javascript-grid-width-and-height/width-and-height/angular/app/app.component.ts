import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AllCommunityModules} from "@ag-grid-community/all-modules";

import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

console.log(AllCommunityModules);

@Component({
    selector: 'my-app',
    template: `
        <div style='height: 100%'>
            <div style="margin-bottom: 5px;">
                <button (click)="fillLarge()">Fill 100%</button>
                <button (click)="fillMedium()">Fill 60%</button>
                <button (click)="fillExact()">Exactly 400 x 400 pixels</button>
            </div>
            <div [ngStyle]="style">
                <ag-grid-angular
                        style="width: 100%; height: calc(100% - 25px);"
                        #agGrid
                        class="ag-theme-balham"
                        [rowData]="rowData"
                        [columnDefs]="columnDefs"
                        [modules]="modules"
                        (firstDataRendered)="onFirstDataRendered($event)">
                </ag-grid-angular>
            </div>
        </div>
    `
})
export class AppComponent {
    columnDefs;
    rowData;
    style = {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box'
    };
    modules = AllCommunityModules;

    @ViewChild('agGrid') agGrid;

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {headerName: "Athlete", field: "athlete", width: 150},
            {headerName: "Age", field: "age", width: 90},
            {headerName: "Country", field: "country", width: 120},
            {headerName: "Year", field: "year", width: 90},
            {headerName: "Date", field: "date", width: 110},
            {headerName: "Sport", field: "sport", width: 110},
            {headerName: "Gold", field: "gold", width: 100},
            {headerName: "Silver", field: "silver", width: 100},
            {headerName: "Bronze", field: "bronze", width: 100},
            {headerName: "Total", field: "total", width: 100}
        ];
    }

    ngOnInit() {
        this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json').subscribe(data => {
            this.rowData = data;
        });
    }

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    fillLarge() {
        this.setWidthAndHeight('100%', '100%');
    }

    fillMedium() {
        this.setWidthAndHeight('60%', '60%');
    }

    fillExact() {
        this.setWidthAndHeight('400px', '400px');
    }

    setWidthAndHeight(width, height) {
        this.style = {
            marginTop: '20px',
            width: width,
            height: height
        };
    }
}
