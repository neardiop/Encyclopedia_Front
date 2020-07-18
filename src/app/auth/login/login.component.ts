import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../@core/utils/services/api.services';



class User {

  id: number = 0;

  ident: string = '';

  pass: string = '';

}

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  protected options: {};
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  rememberMe: boolean;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  url: string;
  idclient: number;
  message: string;
  showErrorMessage: boolean = false;
  missions: any;
  limit: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,

  ) {

  }

  ngOnInit() {

    if (localStorage.getItem('connect') != null) {
      this.idclient = JSON.parse(localStorage.getItem('connect')).idclient1;
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')])],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  getLimit(url: string): void {
    this.apiService.getData(url).subscribe(
      (results: any) => {
        this.missions = results.data;
      }, () => {
        alert('error for getting the limit');
      }, () => {
        if (!this.missions){
          this.limit = 60
          localStorage.setItem('limit',this.limit)
        }
        else{
          this.limit = 30
          localStorage.setItem('limit',this.limit)
        }
        this.router.navigate(['/dashboard']);
      },
    );
  }


  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.user = new User();
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;
    this.url = '/authentication_token';
    let object: string;
    object = JSON.stringify(this.user);
    this.apiService.login(object, this.url)
      .subscribe(
        data => {
          console.log(data)
          if (data.token != null) {
            localStorage.setItem('connect', JSON.stringify(data.token));
            localStorage.setItem('username', JSON.stringify(this.user.username));
            this.router.navigate(['/dashboard']);
          } else {
            this.message = data.error;
            this.showErrorMessage = true;
          }
        },
        error => {
        },()=>{
          
        });
  }
  
}
