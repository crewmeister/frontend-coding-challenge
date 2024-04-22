import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { MemberAbsenseData, Status } from '../input-data'
import { WorkforceService } from '../workforce.service';

 export interface FilterOptions {
   status: string;
   value: boolean
  }
  const TIME_SECONDS = 1000;
  const TIME_HOURS = 24;
  const TIME_MINUTES =3600
  const NO_RECORDS = '-';
  const DATE_FORMAT = 'D/MM/YYYY';
@Component({
  selector: 'app-absense-data',
  templateUrl: './absense-data.component.html',
  styleUrls: [ './absense-data.component.css' ],
})
export class AbsenseDataComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) public sort: MatSort;

  public columnsToDisplay: string[] =  ["name", "createdAt", "memberNote", "status", "statusDate", "type", "userId"]; // TODO make this dynamic somehow //private
  public dataSource: MatTableDataSource<MemberAbsenseData>;
  public loadingIndicator = false;
  public fileName= 'ExcelSheet.xlsx';
  public tableData: MemberAbsenseData[];
  public filterStatusOptions: Array<{ status: string; value: boolean}> = [];
  public selectedDate: string;
  public error = false;

  constructor(@Inject(WorkforceService) private readonly workforceService: WorkforceService) {
  }

  public ngOnInit() {
    this.loadingIndicator = true;
    this.workforceService.getEmployeeAbsenseData().subscribe((response) => {
      this.tableData = response;
      this.getStatus();
      this.loadingIndicator = true;
      this.dataSource = new MatTableDataSource(this.tableData);
      this.loadingIndicator = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeStatusFilterOptions();
    }, () => {
      this.error = true;
    });

  }

  public formateDate(date: string) {
    return (date) ? moment(date).format(DATE_FORMAT) : NO_RECORDS;
  }

  public getAbsensePeriod(startDate: string, endDate: string) {
    const diffDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (TIME_MINUTES * TIME_HOURS * TIME_SECONDS);

    return Math.floor(diffDays) + 1;
  }

  public getStatusdate(confirmatedDate: string, rejectedDate: string) {
    let statusDate = '-';
    if (confirmatedDate) {
      statusDate = this.formateDate(confirmatedDate);
    } else if (rejectedDate) {
      statusDate = this.formateDate(rejectedDate);
    }

    return statusDate;
  }

  public exportExcel(): void {
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  public clearFilterOnDates() {
    this.selectedDate = '';
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public filterOnDates() {
    const filteredTableData = this.tableData.filter((data) => {
      return new Date(data.startDate).getTime() <= new Date(this.selectedDate).getTime() && new Date(data.endDate).getTime() >= new Date(this.selectedDate).getTime()
    }).slice();
    this.dataSource = new MatTableDataSource(filteredTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  public fiterForSelectedEvents(checked: any, status: Status) {
    this.filterStatusOptions.forEach((element) => {
      if (element.status === status) {
        element.value = checked;
      }
    });

    let statusToBeDisplayed = this.filterStatusOptions.map((data) => {
      if (data.value) {
        return data.status
      }
    });

    statusToBeDisplayed = statusToBeDisplayed.filter((element) => {
      return element !== undefined;
   });

    const filteredTableData = this.tableData.filter((data) => {
      return (statusToBeDisplayed.length > 0) ? statusToBeDisplayed.includes(data.status) : true;
    }).slice();

    this.dataSource = new MatTableDataSource(filteredTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private initializeStatusFilterOptions() {
    for (const value of Object.values(Status)) {
      this.filterStatusOptions.push({
        status: value,
        value: false
      });
    }
  }

  private getStatus() {
    this.tableData.forEach((data) => {
      if (data.confirmedAt) {
        data.status = Status.CONFIRMED;
      } else if (data.rejectedAt) {
        data.status = Status.REJECTED
      } else {
        data.status = Status.REQUESTED
      }
    });
  }
}
