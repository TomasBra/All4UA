import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../Classes/User';
import {HttpResponse} from '../Classes/HttpResponse';
import {Errors} from '../Consts/Errors';
import {Driver} from '../Classes/Driver';
import {DriverService} from '../driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  DriverPostForm: FormGroup;
  driver: Driver = new Driver();
  Drivers: Driver[] = new Array<Driver>();

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private driverService: DriverService) {
  }

  ngOnInit(): void {
    this.initializePostForm();
    this.driverService.LoadDrivers(false).then(drivers => this.Drivers = drivers);
    //
    this.driver.GetGPS();
  }

  initializePostForm(): void {
    this.DriverPostForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      destination: ['', Validators.required],
      provide: [''],
      count: [1, [Validators.required, Validators.min(1)]],
      countKids: [0, [Validators.required, Validators.min(0)]],
      password: ['', [Validators.required]]
    });
  }

  async CreatePost(Form: FormGroup): Promise<void> {
    let user: User = new User();
    user.LoadUser();

    if (Form.valid) {
      user.HashPassword(Form.value.password).then(hashed => this.driver.password = hashed);

      this.driver.name = Form.value.name;
      this.driver.description = Form.value.description;
      this.driver.phone = Form.value.phone;
      this.driver.country = Form.value.country;
      this.driver.city = Form.value.city;
      this.driver.destination = Form.value.destination;
      this.driver.provide = Form.value.provide;
      this.driver.count = Form.value.count;
      this.driver.countKids = Form.value.countKids;

      // refugee.dateLastseen = Form.value.dateLastseen;
      // refugee.dateFinished = Form.value.dateFinished;
      this.driverService.SearchDriversByPhone(Form.value.phone).then(drivers => {
        if (user.CanCreatePost(drivers)) {
          this.driverService.CreateDriver(this.driver).then((data: HttpResponse<Driver>) => {
            if (data.status === Errors.OK) {
              this.driverService.GetDriverById(data.data.id).then(driver => {
                user = new User();
                user.LoadFromUser(driver);
                //
                user.SaveUser();
                //
                Form.reset();
                //
                alert('Post was successfuly created.');
                this.router.navigate(['/drivers']);
              });
            }
          });
        } else {
          alert('Post with this phone number was already created.');
        }
      });
    }
  }

}
