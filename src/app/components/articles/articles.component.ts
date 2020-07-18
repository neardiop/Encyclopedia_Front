import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../@core/utils/services/api.services';
import { UserActivityData } from '../../@core/data/user-activity';



class Article {

  id: number

  name: string = '';

  description: string = '';

  content:string

  createdAt:Date = new Date()

  updatedAt:Date = new Date()

  status:Boolean = false

  user_id:1

  sub_categorie_id:2

}

@Component({
  selector: 'ngx-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  protected options: {};
  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: any;
  submitted: boolean;
  rememberMe: boolean;
  createArticleForm: FormGroup;
  loading = false;
  returnUrl: string;
  url: string;
  article: any;
  articles: any
  sub_categories:any

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,

  ) {

  }

  ngOnInit() {
    this.createArticleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')])],
      description: [''],
      content: [''],
      sub_categorie_id: ['']
    });
    this.getSubCategories('/sub_categories')
  }

  get data_form() { return this.createArticleForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.createArticleForm.invalid) {
      return;
    }

    this.loading = true;
    this.article = new Article();
    this.article.name = this.data_form.name.value;
    this.article.description = this.data_form.description.value;
    this.article.content = this.data_form.content.value;
    this.article.user = "/users/1";
    this.article.subCategorie = "/sub_categories/"+this.data_form.sub_categorie_id.value

    this.url = '/articles';
    let object: string;
    object = JSON.stringify(this.article);
    console.log(object)
    this.apiService.createData(object, this.url)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
        },()=>{
          this.router.navigate(['/dashboard']);
        });
  }

  getSubCategories(url: string): void {
    this.apiService.getData(url).subscribe((results: any) => {
      console.log(results)
      this.sub_categories = results["hydra:member"]
    })
  }
  
}
