import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../Classes/User';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DriverService} from '../driver.service';
import {Driver} from '../Classes/Driver';

@Component({
  selector: 'app-offers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  DriverSearchForm: FormGroup;
  Drivers: Array<Driver> = new Array<Driver>();
  user: User = new User();
  limit: number;

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute,
  private router: Router, private driverService: DriverService) {
  }

  ngOnInit(): void {
    this.user.LoadUser();
    // has to be here, before loading refugees
    this.InitializeRouteParams();
    //
    this.driverService.LoadDrivers(this.limit).then(drivers => this.Drivers = drivers);
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
    this.DriverSearchForm = this.fb.group({
      searchValue: [''],
    });
  }

  LoadDrivers(): void {
    this.driverService.LoadDrivers(this.limit).then(drivers => this.Drivers = drivers);
  }

  SendSearchForm(): void {
    if (this.DriverSearchForm.valid) {
      this.driverService.SendSearchForm(this.DriverSearchForm.value.searchValue, this.limit).then(drivers => this.Drivers = drivers);
    }
  }

  DeleteDriver(driver: Driver): void {
    this.user.CanMakeChanges(driver).then(canMakeChanges => {
      if (canMakeChanges) {
        this.driverService.DeleteDriver(driver).then(response => {
          if (response) {
            this.LoadDrivers();
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
    this.router.navigate(['/drivers/' + this.limit.toLocaleString()]);
    this.SendSearchForm();
  }

}
