import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { MasterService } from "../../master.service"
import { LOAD_BLOG, addblog, deleteblog, loadblogfail, loadblogsuccess } from "./Blog.actions"
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs"
import { BlogModel } from "./Blog.model"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable()
export class BlogEffects {
    constructor(private action$: Actions, private service: MasterService) {

    }

    _blog = createEffect(() =>
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
                        catchError(() => EMPTY)
                    )
                })
            )
    );


}


