import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HomeProvider} from '../Classes/HomeProvider';
import {User} from '../Classes/User';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeProviderService} from '../home-provider.service';

@Component({
  selector: 'app-home-provider',
  templateUrl: './home-providers.component.html',
  styleUrls: ['./home-providers.component.css']
})
export class HomeProvidersComponent implements OnInit {

  HomeProviderSearchForm: FormGroup;
  HomeProviders: Array<HomeProvider> = new Array<HomeProvider>();
  user: User = new User();
  limit: number;

  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private homeProviderService: HomeProviderService) {
  }

  ngOnInit(): void {
    this.user.LoadUser();
    // has to be here, before loading homeProviders
    this.InitializeRouteParams();
    //
    this.homeProviderService.LoadHomeProviders(this.limit).then((homeProviders: Array<HomeProvider>) => this.HomeProviders = homeProviders);
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
    this.HomeProviderSearchForm = this.fb.group({
      searchValue: [''],
    });
  }

  LoadHomeProviders(): void {
    this.homeProviderService.LoadHomeProviders(this.limit).then((homeProviders: Array<HomeProvider>) => this.HomeProviders = homeProviders);
  }

  SendSearchForm(): void {
    if (this.HomeProviderSearchForm.valid) {
      this.homeProviderService.SendSearchForm(this.HomeProviderSearchForm.value.searchValue, this.limit).then((homeProviders: Array<HomeProvider>) =>
        this.HomeProviders = homeProviders);
    }
  }

  DeleteHomeProvider(homeProvider: HomeProvider): void {
    this.user.CanMakeChanges(homeProvider).then(canMakeChanges => {
      if (canMakeChanges) {
        this.homeProviderService.DeleteHomeProvider(homeProvider).then((response: boolean) => {
          if (response) {
            this.LoadHomeProviders();
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
    this.router.navigate(['/homeProviders/' + this.limit.toLocaleString()]);
    this.SendSearchForm();
  }

}

