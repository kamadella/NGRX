import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MasterService } from "../../master.service"
import { LOAD_BLOG, addblog, addblogsuccess, deleteblog, deleteblogsuccess, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./Blog.actions"
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs"
import { BlogModel } from "./Blog.model"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable()
export class BlogEffects {
    constructor(private action$: Actions, private service: MasterService) {

    }

    _loadblog = createEffect(() =>
        this.action$
            .pipe(
                ofType(LOAD_BLOG),
                exhaustMap((action) => {
                    return this.service.GetAllBlogs().pipe( //pobieram dane z serwisu http
                        map((data) => {
                            /*Jeśli zapytanie zakończy się sukcesem, dane są przekształcane za pomocą map, 
                            a efekt emituje nową akcję loadblogsuccess, przekazując pobrane dane jako payload. 
                            */
                            return loadblogsuccess({ bloglist: data });
                        }),
                        catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
                    )
                })
            )
    );

    _AddBlog = createEffect(() =>
        this.action$.pipe(
            ofType(addblog),
            exhaustMap(action => {
                return this.service.CreateBlog(action.bloginput).pipe(
                    map((data) => {
                        return addblogsuccess({ bloginput: data as BlogModel});
                    }), 
                    catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
                )
            })
        )
    );

    
    _UpdateBlog = createEffect(() =>
        this.action$.pipe(
            ofType(updateblog),
            exhaustMap(action => {
                return this.service.UpdateBlog(action.bloginput).pipe(
                    map(() => {
                        return updateblogsuccess({ bloginput: action.bloginput});
                    }), 
                    catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
                )
            })
        )
    );


    _DeleteBlog = createEffect(() =>
    this.action$.pipe(
        ofType(deleteblog),
        exhaustMap(action => {
            return this.service.DeleteBlog(action.id).pipe(
                map(() => {
                    return deleteblogsuccess({ id: action.id});
                }), 
                catchError((_error) => of(loadblogfail({ Errortext: _error.message })))
            )
        })
    )
);

}


