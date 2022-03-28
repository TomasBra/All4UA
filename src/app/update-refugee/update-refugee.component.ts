import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RefugeeService} from '../refugee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Refugee} from '../Classes/Refugee';
import {User} from '../Classes/User';
import {HttpResponse} from '../Classes/HttpResponse';
import {Errors} from '../Consts/Errors';

@Component({
  selector: 'app-update-refugee',
  templateUrl: './update-refugee.component.html',
  styleUrls: ['./update-refugee.component.css']
})
export class UpdateRefugeeComponent implements OnInit {

  id: number;
  RefugeeUpdateForm: FormGroup;
  OriginalPost: Refugee = new Refugee();
  newRefugee: Refugee = new Refugee();

  constructor(private refugeeService: RefugeeService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.InitializeRouteParams();
    this.refugeeService.GetRefugeeById(this.id).then(refugee => {
      this.OriginalPost = refugee;
      this.RefugeeUpdateForm.patchValue({
        name: refugee.name,
        description: refugee.description,
        phone: refugee.phone,
        country: refugee.country,
        city: refugee.city,
        destination: refugee.destination,
        need: refugee.need,
        count: refugee.count,
        countKids: refugee.countKids,
      });
    });
    this.initializeUpdateRefugeeForm();
  }

  InitializeRouteParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.id = parseInt(id);
    }
  }

  initializeUpdateRefugeeForm(): void {
    this.RefugeeUpdateForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      destination: ['', Validators.required],
      need: [''],
      count: [1, [Validators.required, Validators.min(1)]],
      countKids: [0, [Validators.required, Validators.min(0)]],
      password: ['password', [Validators.required]]
    });
  }

  UpdateRefugee(Form: FormGroup): void {
    let user: User = new User();
    user.LoadUser();

    if (Form.valid) {
      user.CanMakeChanges(this.OriginalPost).then(canMakeChanges => {
        if (canMakeChanges) {
          this.newRefugee.id = this.id;
          this.newRefugee.name = Form.value.name;
          this.newRefugee.description = Form.value.description;
          this.newRefugee.phone = Form.value.phone;
          this.newRefugee.country = Form.value.country;
          this.newRefugee.city = Form.value.city;
          this.newRefugee.destination = Form.value.destination;
          this.newRefugee.need = Form.value.need;
          this.newRefugee.count = Form.value.count;
          this.newRefugee.countKids = Form.value.countKids;
          this.newRefugee.dateCreated = this.OriginalPost.dateCreated;

          // refugee.dateLastseen = Form.value.dateLastseen;
          // refugee.dateFinished = Form.value.dateFinished;

          this.refugeeService.UpdateRefugee(this.newRefugee).then((updatedRefugee: HttpResponse<Refugee>) => {
            if (updatedRefugee.status === Errors.OK) {
              this.refugeeService.GetRefugeeById(this.id).then(refugee => {
                user = new User();
                user.LoadFromUser(refugee);
                //
                user.SaveUser();
                //
                Form.reset();
                //
                alert('Post was successfuly updated.');
                this.router.navigate(['/looking']);
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
