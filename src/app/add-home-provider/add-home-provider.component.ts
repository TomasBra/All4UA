import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeProvider} from '../Classes/HomeProvider';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../Classes/User';
import {HttpResponse} from '../Classes/HttpResponse';
import {Errors} from '../Consts/Errors';
import {HomeProviderService} from '../home-provider.service';

@Component({
  selector: 'app-add-home-provider',
  templateUrl: './add-home-provider.component.html',
  styleUrls: ['./add-home-provider.component.css']
})
export class AddHomeProviderComponent implements OnInit {

  HomeProviderPostForm: FormGroup;
  homeProvider: HomeProvider = new HomeProvider();
  HomeProviders: HomeProvider[] = new Array<HomeProvider>();

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private homeProviderService: HomeProviderService) {
  }

  ngOnInit(): void {
    this.initializePostForm();
    this.homeProviderService.LoadHomeProviders(false).then(homeProviders => this.HomeProviders = homeProviders);
    //
    this.homeProvider.GetGPS();
  }

  initializePostForm(): void {
    this.HomeProviderPostForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
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
      user.HashPassword(Form.value.password).then(hashed => this.homeProvider.password = hashed);

      this.homeProvider.name = Form.value.name;
      this.homeProvider.description = Form.value.description;
      this.homeProvider.phone = Form.value.phone;
      this.homeProvider.country = Form.value.country;
      this.homeProvider.city = Form.value.city;
      this.homeProvider.address = Form.value.address;
      this.homeProvider.provide = Form.value.provide;
      this.homeProvider.count = Form.value.count;
      this.homeProvider.countKids = Form.value.countKids;

      // refugee.dateLastseen = Form.value.dateLastseen;
      // refugee.dateFinished = Form.value.dateFinished;
      this.homeProviderService.SearchHomeProvidersByPhone(Form.value.phone).then(homeProviders => {
        if (user.CanCreatePost(homeProviders)) {
          this.homeProviderService.CreateHomeProvider(this.homeProvider).then((data: HttpResponse<HomeProvider>) => {
            if (data.status === Errors.OK) {
              this.homeProviderService.GetHomeProviderById(data.data.id).then(homeProvider => {
                user = new User();
                user.LoadFromUser(homeProvider);
                //
                user.SaveUser();
                //
                Form.reset();
                //
                alert('Post was successfuly created.');
                this.router.navigate(['/homeProviders']);
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
