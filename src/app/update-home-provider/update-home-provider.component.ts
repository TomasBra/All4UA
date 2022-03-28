import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeProvider} from '../Classes/HomeProvider';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../Classes/User';
import {HttpResponse} from '../Classes/HttpResponse';
import {Errors} from '../Consts/Errors';
import {HomeProviderService} from '../home-provider.service';

@Component({
  selector: 'app-update-home-provider',
  templateUrl: './update-home-provider.component.html',
  styleUrls: ['./update-home-provider.component.css']
})
export class UpdateHomeProviderComponent implements OnInit {

  id: number;
  HomeProviderUpdateForm: FormGroup;
  OriginalPost: HomeProvider = new HomeProvider();
  newHomeProvider: HomeProvider = new HomeProvider();

  constructor(private homeProviderService: HomeProviderService, private route: ActivatedRoute,
              private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.InitializeRouteParams();
    this.homeProviderService.GetHomeProviderById(this.id).then(homeProvider => {
      this.OriginalPost = homeProvider;
      this.HomeProviderUpdateForm.patchValue({
        name: homeProvider.name,
        description: homeProvider.description,
        phone: homeProvider.phone,
        country: homeProvider.country,
        city: homeProvider.city,
        address: homeProvider.address,
        provide: homeProvider.provide,
        count: homeProvider.count,
        countKids: homeProvider.countKids,
      });
    });
    this.initializeUpdateHomeProviderForm();
  }

  InitializeRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = parseInt(id);
    }
  }

  initializeUpdateHomeProviderForm(): void {
    this.HomeProviderUpdateForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      provide: [''],
      count: [1, [Validators.required, Validators.min(1)]],
      countKids: [0, [Validators.required, Validators.min(0)]],
      password: ['password', [Validators.required]]
    });
  }

  UpdateHomeProvider(Form: FormGroup): void {
    let user: User = new User();
    user.LoadUser();

    if (Form.valid) {
      user.CanMakeChanges(this.OriginalPost).then(canMakeChanges => {
        if (canMakeChanges) {
          this.newHomeProvider.id = this.id;
          this.newHomeProvider.name = Form.value.name;
          this.newHomeProvider.description = Form.value.description;
          this.newHomeProvider.phone = Form.value.phone;
          this.newHomeProvider.country = Form.value.country;
          this.newHomeProvider.city = Form.value.city;
          this.newHomeProvider.address = Form.value.address;
          this.newHomeProvider.provide = Form.value.provide;
          this.newHomeProvider.count = Form.value.count;
          this.newHomeProvider.countKids = Form.value.countKids;
          this.newHomeProvider.dateCreated = this.OriginalPost.dateCreated;

          // refugee.dateLastseen = Form.value.dateLastseen;
          // refugee.dateFinished = Form.value.dateFinished;

          this.homeProviderService.UpdateHomeProvider(this.newHomeProvider).then((updatedHomeProvider: HttpResponse<HomeProvider>) => {
            if (updatedHomeProvider.status === Errors.OK) {
              this.homeProviderService.GetHomeProviderById(this.id).then(homeProvider => {
                user = new User();
                user.LoadFromUser(homeProvider);
                //
                user.SaveUser();
                //
                Form.reset();
                //
                alert('Post was successfuly updated.');
                this.router.navigate(['/homeProviders']);
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
