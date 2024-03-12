import { Component, OnInit } from '@angular/core';
import { BlogModel, Blogs } from '../../shared/store/Blog/Blog.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getblog, getbloginfo } from '../../shared/store/Blog/Blog.selector';
import { AppStateModel } from '../../shared/store/Global/AppState.Model';
import { MatDialog } from '@angular/material/dialog';
import { AddblogComponent } from '../addblog/addblog.component';
import { deleteblog, loadblog } from '../../shared/store/Blog/Blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{

  constructor(private store:Store<AppStateModel>, private dialog: MatDialog){

  }

  bloglist !: BlogModel[];
  bloginfo!: Blogs;
  
  ngOnInit(): void {
    this.store.dispatch(loadblog());
    this.store.select(getbloginfo).subscribe(item => {
      //this.bloglist = item;
      this.bloginfo=item;
      
    });
  }

  AddBlog(){
    this.OpenPopup(0, 'Add Blog');
  }

  EditBlog(id: any){
    this.OpenPopup(id, 'Edit Blog', true);
  }

  RemoveBlog(id: any){
    if(confirm("Jesteś pewien że chcesz usunąć?")){
      this.store.dispatch(deleteblog({id:id}));
    }
  }

  OpenPopup(id:any, title:any,isedit=false){
    this.dialog.open(AddblogComponent, {
      width: '40%',
      data: {
        id:id,
        title:title,
        isedit:isedit
      }
    })
  }
}
