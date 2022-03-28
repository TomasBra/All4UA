import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../Classes/User';
import {HttpResponse} from '../Classes/HttpResponse';
import {Errors} from '../Consts/Errors';
import {Driver} from '../Classes/Driver';
import {DriverService} from '../driver.service';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent implements OnInit {


  id: number;
  DriverUpdateForm: FormGroup;
  OriginalPost: Driver = new Driver();
  newDriver: Driver = new Driver();

  constructor(private driverService: DriverService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.InitializeRouteParams();
    this.driverService.GetDriverById(this.id).then(driver => {
      this.OriginalPost = driver;
      this.DriverUpdateForm.patchValue({
        name: driver.name,
        description: driver.description,
        phone: driver.phone,
        country: driver.country,
        city: driver.city,
        destination: driver.destination,
        provide: driver.provide,
        count: driver.count,
        countKids: driver.countKids,
      });
    });
    this.initializeUpdateDriverForm();
  }

  InitializeRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = parseInt(id);
    }
  }

  initializeUpdateDriverForm(): void {
    this.DriverUpdateForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      destination: ['', Validators.required],
      provide: [''],
      count: [1, [Validators.required, Validators.min(1)]],
      countKids: [0, [Validators.required, Validators.min(0)]],
      password: ['password', [Validators.required]]
    });
  }

  UpdateDriver(Form: FormGroup): void {
    let user: User = new User();
    user.LoadUser();

    if (Form.valid) {
      user.CanMakeChanges(this.OriginalPost).then(canMakeChanges => {
        if (canMakeChanges) {
          this.newDriver.id = this.id;
          this.newDriver.name = Form.value.name;
          this.newDriver.description = Form.value.description;
          this.newDriver.phone = Form.value.phone;
          this.newDriver.country = Form.value.country;
          this.newDriver.city = Form.value.city;
          this.newDriver.destination = Form.value.destination;
          this.newDriver.provide = Form.value.provide;
          this.newDriver.count = Form.value.count;
          this.newDriver.countKids = Form.value.countKids;
          this.newDriver.dateCreated = this.OriginalPost.dateCreated;

          // refugee.dateLastseen = Form.value.dateLastseen;
          // refugee.dateFinished = Form.value.dateFinished;

          this.driverService.UpdateDriver(this.newDriver).then((updatedDriver: HttpResponse<Driver>) => {
            if (updatedDriver.status === Errors.OK) {
              this.driverService.GetDriverById(this.id).then(driver => {
                user = new User();
                user.LoadFromUser(driver);
                //
                user.SaveUser();
                //
                Form.reset();
                //
                alert('Post was successfuly updated.');
                this.router.navigate(['/drivers']);
              });
            }
          });
        } else {
          alert('Wrong Password.');
        }
      });
    }
  }
}
