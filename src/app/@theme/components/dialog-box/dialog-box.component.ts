import { Component, OnInit,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../@core/utils/services/api.services';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



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
  selector: 'ngx-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

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
  sub_categories : any

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,

  ) {

  }

  ngOnInit() {
    this.createArticleForm = this.formBuilder.group({
      name: [this.data.name, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]+$')])],
      description: [this.data.description],
      content: [this.data.content]
    });
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
    this.article.subCategorie = "/sub_categories/4"

    this.url = '/articles/'  + this.data.id;
    let object: string;
    object = JSON.stringify(this.article);
    console.log(object)
    this.apiService.updateData(object, this.url)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
        },()=>{
          this.router.navigate(['/dashboard']);
        });
  }


  getSubCategories(url) {
    this.apiService.getData(url).subscribe(
      data => {
        this.sub_categories = data["hydra:member"]
        console.log(this.sub_categories)
      },
      error => {
      }, () => {
        //alert("Good")
      });
  }

}
