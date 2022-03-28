import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Refugee} from '../Classes/Refugee';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../Classes/User';
import {ActivatedRoute, Router} from '@angular/router';
import {RefugeeService} from '../refugee.service';

@Component({
  selector: 'app-looking-for-pickup',
  templateUrl: './refugee.component.html',
  styleUrls: ['./refugee.component.css']
})

export class RefugeeComponent implements OnInit {

  RefugeeSearchForm: FormGroup;
  Refugees: Array<Refugee> = new Array<Refugee>();
  user: User = new User();
  limit: number;

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private refugeeService: RefugeeService) {
  }

  ngOnInit(): void {
    this.user.LoadUser();
    // has to be here, before loading refugees
    this.InitializeRouteParams();
    //
    this.refugeeService.LoadRefugees(this.limit).then(refugees => this.Refugees = refugees);
    this.InitializeSearchForm();
    //
  }

  InitializeRouteParams(): void {
    const limit = this.route.snapshot.paramMap.get('limit');
    if (limit != null) {
      this.limit = parseInt(limit);
    }
  }

  InitializeSearchForm(): void {
    this.RefugeeSearchForm = this.fb.group({
      searchValue: [''],
    });
  }

  LoadRefugees(): void {
    this.refugeeService.LoadRefugees(this.limit).then(refugees => this.Refugees = refugees);
  }

  SendSearchForm(): void {
    if (this.RefugeeSearchForm.valid) {
      this.refugeeService.SendSearchForm(this.RefugeeSearchForm.value.searchValue, this.limit).
      then(refugees => this.Refugees = refugees);
    }
  }

  DeleteRefugee(refugee: Refugee): void {
    this.user.CanMakeChanges(refugee).then(canMakeChanges => {
      if (canMakeChanges) {
        this.refugeeService.DeleteRefugee(refugee).then(response => {
          if (response) {
            this.LoadRefugees();
          } else {
            alert('Failed to delete record.');
          }
        });
      } else {
        alert('You have no authority to delete this POST.');
      }
    });
  }

  LoadMore(): void {
    this.limit += 6;
    this.router.navigate(['/looking/' + this.limit.toLocaleString()]);
    this.SendSearchForm();
  }

}
