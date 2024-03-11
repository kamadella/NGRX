import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../../shared/store/Blog/Blog.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getblog } from '../../shared/store/Blog/Blog.selector';
import { AppStateModel } from '../../shared/store/Global/AppState.Model';
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../addblog/addblog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{

  constructor(private store:Store<AppStateModel>, private dialog: MatDialog){

  }

  bloglist !: BlogModel[];
  
  ngOnInit(): void {
    this.store.select(getblog).subscribe(item => {
      this.bloglist = item;
    });
  }

  AddBlog(){
    this.dialog.open(AddblogComponent, {
      width: '40%'
    })
  }
}
