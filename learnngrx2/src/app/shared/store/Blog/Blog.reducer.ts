import { createReducer,on } from "@ngrx/store";
import { BlogState } from "./Blog.state";
import { addblog, addblogsuccess, deleteblog, loadblog, loadblogfail, loadblogsuccess, updateblog, updateblogsuccess } from "./Blog.actions";
import { BlogModel } from "./Blog.model";


const _blogReducer = createReducer(BlogState,
    on(loadblog, (state) => {
        return {
            ...state
        };
    }),
    on(loadblogsuccess, (state,action) => {
        return {
            ...state,
            blogList:[...action.bloglist],
            Errormessage:''
        };
    }),
    on(loadblogfail, (state,action) => {
        console.log(action.Errortext)
        return{
            ...state,
            bloglist:[],
            Errormessage:action.Errortext.message
        };
    }),
    
    // on(addblog, (state, action) => { //przyjmuje aktualny stan i obiekt akcji, 
    //     const _blog ={...action.bloginput} //bloginput bo tak sie w akcji nazywa 
    //     _blog.id = state.blogList.length + 1;
    //     return { // a następnie zwraca nowy stan
    //         ...state,
    //         blogList:[...state.blogList, _blog]
    //     };
    // }),
    on(addblogsuccess, (state, action) => { //przyjmuje aktualny stan i obiekt akcji, 
        const _blog ={...action.bloginput} //bloginput bo tak sie w akcji nazywa 
        return { // a następnie zwraca nowy stan
            ...state,
            blogList:[...state.blogList, _blog]
        };
    }),
    on(updateblogsuccess, (state, action) => {
        const _blog ={...action.bloginput}
        const updatedblogs=state.blogList.map(blog=>{ //mapuje listę istniejących wpisów bloga (state.blogList) na nową listę, w której wpis zaktualizowany zastępuje stary wpis o tym samym ID.
            /*
            Iteruje przez każdy wpis bloga w state.blogList. Dla każdego wpisu sprawdza, czy jego ID zgadza się z ID wpisu przekazanego w akcji (_blog.id). 
            Jeśli tak, zastępuje ten wpis nowymi danymi (_blog). 
            W przeciwnym przypadku, zwraca niezmieniony wpis. 
            Efektem tej operacji jest nowa lista wpisów bloga, gdzie dokładnie jeden wpis został zaktualizowany
            */
            return _blog.id === blog.id?_blog:blog;
        })
        return {
            ...state,
            blogList:updatedblogs //zwracam zaktualizowaną listę blogów
        };
    }),
    on(deleteblog, (state, action) => {  
        const updatedblogs = state.blogList.filter((data:BlogModel)=>{
            return data.id !== action.id;
        })
        return { 
            ...state,
            blogList:updatedblogs
        };
    }),
)

export function blogReducer(state: any, action: any) {
    return _blogReducer(state, action);

}