import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {URLPrefix} from '../Consts/URL';
import {Refugee} from '../Classes/Refugee';
import {Router} from '@angular/router';
import {HttpResponse} from '../Classes/HttpResponse';
import {User} from '../Classes/User';
import {UserRoles} from '../Consts/UserRoles';
import {DateConvertor} from '../Classes/DateConvertor';
import {Errors} from '../Consts/Errors';
import {Sort} from '../Consts/Sort';
import {RefugeeService} from '../refugee.service';

@Component({
  selector: 'app-add-pickup-post',
  templateUrl: './add-pickup-post.component.html',
  styleUrls: ['./add-pickup-post.component.css']
})
export class AddPickupPostComponent implements OnInit {

  RefugeePostForm: FormGroup;
  refugee: Refugee = new Refugee();
  Refugees: Refugee[] = new Array<Refugee>();

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private refugeeService: RefugeeService) {
  }

  ngOnInit(): void {
    this.initializePostForm();
    this.refugeeService.LoadRefugees(false).then(refugees => this.Refugees = refugees);
    //
    this.refugee.GetGPS();
  }

  initializePostForm(): void {
    this.RefugeePostForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      destination: ['', Validators.required],
      need: [''],
      count: [1, [Validators.required, Validators.min(1)]],
      countKids: [0, [Validators.required, Validators.min(0)]],
      password: ['', [Validators.required]]
    });
  }

  async CreatePost(Form: FormGroup): Promise<void> {
    let user: User = new User();
    user.LoadUser();

    if (Form.valid) {
      user.HashPassword(Form.value.password).then(hashed => this.refugee.password = hashed);


      this.refugee.name = Form.value.name;
      this.refugee.description = Form.value.description;
      this.refugee.phone = Form.value.phone;
      this.refugee.country = Form.value.country;
      this.refugee.city = Form.value.city;
      this.refugee.destination = Form.value.destination;
      this.refugee.need = Form.value.need;
      this.refugee.count = Form.value.count;
      this.refugee.countKids = Form.value.countKids;

      // refugee.dateLastseen = Form.value.dateLastseen;
      // refugee.dateFinished = Form.value.dateFinished;
      this.refugeeService.SearchRefugeesByPhone(Form.value.phone).then(refugees => {
        if (user.CanCreatePost(refugees)) {
          this.refugeeService.CreateRefugee(this.refugee).then((data: HttpResponse<Refugee>) => {
            if (data.status === Errors.OK) {
              this.refugeeService.GetRefugeeById(data.data.id).then(refugee => {
                user = new User();
                user.LoadFromUser(refugee);
                //
                user.SaveUser();
                //
                Form.reset();
                //
                alert('Post was successfuly created.');
                this.router.navigate(['/looking']);
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
