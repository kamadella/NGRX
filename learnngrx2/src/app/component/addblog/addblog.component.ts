import { Component, Inject, OnInit } from '@angular/core';
import { BlogModel } from '../../shared/store/Blog/Blog.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppStateModel } from '../../shared/store/Global/AppState.Model';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { addblog, updateblog } from '../../shared/store/Blog/Blog.actions';
import { getblogbyid } from '../../shared/store/Blog/Blog.selector';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrl: './addblog.component.css'
})
export class AddblogComponent implements OnInit {
  pagetitle = '';
  editblogid = 0;
  editdata!: BlogModel;

  constructor(private dialogref: MatDialogRef<AddblogComponent>, private builder: FormBuilder,
    private store: Store<AppStateModel>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.pagetitle = this.data.title;
    if (this.data.isedit) {
      this.editblogid = this.data.id;
      this.store.select(getblogbyid(this.editblogid)).subscribe(_data => {
        this.editdata = _data;
        this.blogform.setValue({ id: this.editdata.id, title: this.editdata.title, description: this.editdata.description });
      });
    }
  }

  blogform = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  })

  SaveBlogs() {
    if (this.blogform.valid) {
      const _bloginput: BlogModel = {
        id: 0,
        title: this.blogform.value.title as string,
        description: this.blogform.value.description as string
      }
      if(this.data.isedit){
        _bloginput.id=this.blogform.value.id as number;
        this.store.dispatch(updateblog({ bloginput: _bloginput }))
        this.closepopup();
      }
      else{
        this.store.dispatch(addblog({ bloginput: _bloginput }))
        this.closepopup();
      }
    }
  }

  closepopup() {
    this.dialogref.close();
  }
}
