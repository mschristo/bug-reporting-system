import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bug } from 'src/app/interfaces/bug';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-bug-item',
  templateUrl: './bug-item.component.html',
  styleUrls: ['./bug-item.component.scss']
})
export class BugItemComponent implements OnInit {

  isNew: boolean = true;
  bug: Bug;

  bugForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    reporter: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  constructor(public router: Router, public bugService: BugService) { }

  ngOnInit(): void {
  }

  prepareBug(): Bug {
    const bug: Bug = {
      title: this.bugForm.get('title')?.value,
      description: this.bugForm.get('description')?.value,
      priority: +this.bugForm.get('priority')?.value,
      reporter: this.bugForm.get('reporter')?.value,
      status: this.bugForm.get('status')?.value,
      created: Date.now().toString(),
      comments: []
    }

    return bug;
  }

  save() {
    if (this.bugForm.valid) {
      this.bugService.addNewBug(this.prepareBug()).subscribe(
        response => {
          this.router.navigateByUrl('home');
        }
      );
    }
  }
}
