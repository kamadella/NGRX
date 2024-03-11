import { BlogComponent } from "../../../component/blog/blog.component";
import { Blogs } from "../Blog/Blog.model";
import { CounterModel } from "../counter.model";

export interface AppStateModel{
    counter: CounterModel,
    blog:Blogs
}