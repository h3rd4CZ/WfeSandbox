import * as React from "react";
import { string } from "prop-types";
import * as css from './style.module.scss';
import { PrincipalSource, sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";

export interface IComponentProps{
    listTitle : string
}

interface IComponentState{
    id:number
}

export default class Component extends React.Component<IComponentProps, IComponentState>{
constructor(props : IComponentProps){
   super(props);

   this.state = {
       id:1000
   }
}

render(){
  const img  :JSX.Element = <button>Click me</button>
  
  return(
      <div>
          { this.state.id > 10 && img }
         
      </div>
   )

}
}