import { Component } from '@angular/core';
import { Category } from '../app.model';
import { FirestoreService } from '../firestore.service';
import { DocumentReference, addDoc, deleteDoc, doc, getDocs, query } from 'firebase/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent {

  categories:Category[]=[];

  addCategoryModal:boolean=false;

  category?:Category=undefined;

  categoryName:string="";

  deleteConfirm:boolean=false;

  constructor(private firestore: FirestoreService){
    this.refresh();

  }

  refresh(){
    this.categories=[];
    let allCategories:Category[]=[];
    const q = query(this.firestore.categoryCollection);
    getDocs(q).then(res=>{
      res.forEach(doc=>
        {
          let d:any = doc.data();
          d.id=doc.id;
          allCategories.push(d);
        });

        allCategories.filter(c=>c.parent==null).forEach(c=>this.categories.push(c));

        this.categories.forEach(c=>this.linkCategories(c,allCategories));

        console.log(this.categories);
    });

  }

  linkCategories(cat:Category,a:Category[]){
    cat.categories=[];
    a.filter(c=>c.parent!=null && c.parent==cat.id).forEach(c=>{
      this.linkCategories(c,a);
      cat.categories?.push(c);
    });
  }

  addCategory(){
    console.log(this.category);
    if(this.isNotEmpty(this.categoryName)){
      let c: Category = {name:this.categoryName,active:true};
      if(this.category) c.parent=this.category.id;
      addDoc(this.firestore.categoryCollection,c).then((ref:DocumentReference)=>{
        alert("Category has been added succesfully ID:"+ref.id);
        this.refresh();
      });
    }
    else{
      alert("Please enter category name");
    }
  }

  isNotEmpty(str:string){
    return str!=null && str!="";
  }

  select(category:Category){
    console.log("Selected Category",category);
    this.category = category;
  }

  deleteCategory(){
    this.deleteConfirm=false;
    if(this.category && this.category.id)
    deleteDoc(doc(this.firestore.firestore,"categories",this.category.id)).then(()=>{
      alert("Deleted category "+this.category?.name);
      this.category = undefined;
      this.refresh();
    });
  }

}
