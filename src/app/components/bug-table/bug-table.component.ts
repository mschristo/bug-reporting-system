import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BugService } from 'src/app/services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bug-table',
  templateUrl: './bug-table.component.html',
  styleUrls: ['./bug-table.component.scss'],
})
export class BugTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'title',
    'priority',
    'reporter',
    'created',
    'status',
    'actionEdit',
    'actionDelete',
  ];

  bugs = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public authService: AuthService,
    public router: Router,
    public bugService: BugService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadBugs();
  }

  ngAfterViewInit() {
    this.bugs.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  edit(item: any) {
    // edit item
  }

  delete(item: any) {
    this.bugService.deleteBug(item.id).subscribe((response) => {
      this.loadBugs();
    });
  }

  loadBugs() {
    this.bugService.getBugs().subscribe((bugs) => {
      this.bugs.data = bugs;
    });
  }
}
