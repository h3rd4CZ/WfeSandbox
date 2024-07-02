import * as React from "react";
import { string } from "prop-types";
import * as css from './style.module.scss';
import { PrincipalSource, sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";

export interface IWpDashboradProps{
    listTitle : string
}

interface ISpItem {
    ID : number,
    Title : string
}

interface IWpDashboardState{
    items : ISpItem[],
    isLoading : boolean,
    err ?: string
}

export default class WpDashboard extends React.Component<IWpDashboradProps, IWpDashboardState>{
constructor(props : IWpDashboradProps){
   super(props);

   this.state = {
       isLoading : false,
       err : undefined,
       items : []
   }
}

componentWillReceiveProps(nextProps : IWpDashboradProps) {
    console.log(`Received new props... : ${nextProps.listTitle}`);
    this.loadData(nextProps.listTitle);
  }

componentDidMount() {

    this.loadData();
}

render(){
  const img  :JSX.Element = <img src="/_layouts/15/images/loading.gif"></img>

  const info : JSX.Element = <div className={css.default.ssdlInfo}>Put list title text below to load data from that list</div>

  let loader : JSX.Element = <span>Loading data...</span>

  let fail : JSX.Element = <span className={css.default.ssdlFailClass}>An error ocured : {this.state.err}</span>

  let content : JSX.Element = <ul> { this.state.items.map((v, i, a) => <li key={v.ID}>{v.ID} - {v.Title }</li> ) } </ul>

  return(
      <div>
          { this.state.isLoading && img }
          { this.state.isLoading && loader }
          { info }
          { content }
          { this.state.err && fail }
      </div>
   )

}

 loadData(titleChanged ?: string){

    let that = this;
    const lt = titleChanged ? titleChanged : this.props.listTitle;
    
    SP.SOD.executeOrDelayUntilScriptLoaded(function(){

    that.setState((s, p) =>{
        return { ...s, isLoading : true };
        });

    var ctx = SP.ClientContext.get_current();
    let caml : SP.CamlQuery = new SP.CamlQuery();
    caml.set_viewXml("<View><Query><Where></Where></Query></View>");

    var items = ctx.get_web().get_lists().getByTitle(lt).getItems(caml);

    ctx.load(items);
    ctx.executeQueryAsync(function(){

        var itemEnumerator = items.getEnumerator();
        let itemResult : ISpItem[] = [];
        while(itemEnumerator.moveNext()){
            var currItm = itemEnumerator.get_current();
            let id = currItm.get_id();
            let title = currItm.get_item("Title");
            itemResult.push({ID : id, Title:title });
        }
        console.log(itemResult);

        that.setState((s, p) =>{
            let prevState = { ...s};
            prevState.err = undefined;
            prevState.items  = itemResult;
            prevState.isLoading = false;
            return prevState;
          });
    },
    function(err, args){
        that.setState((s, p) =>{
            let prevState = { ...s};
            prevState.err = args.get_message();
            prevState.items = [];
            prevState.isLoading = false;
            return prevState;
          });
    });
    }, "sp.js");
 }
}