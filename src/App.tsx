import "core-js/es/map";
import "core-js/es/set";
import 'babel-polyfill';
import * as React from "react";
import * as ReactDOM from "react-dom";
import WpDashboard from "./WpDashboard"

import { setup as pnpSetup } from "@pnp/common";

import * as msal from "msal";

import { AuthProvider } from "./Auth/authProvider";

import * as msalSettings from "./Auth/authSettings";

import ReactJson from "react-json-view";

import Component from "./Component";

class App extends React.Component<{},{ text: string; listTitle: string; wsData: any }> {

  constructor(props: any) {
    super(props);

    this.state = {
      text: "",
      listTitle: `${""}`,
      wsData: { title: "Title", ageOf: 45 }
    };

  }

  render() {
    let input: JSX.Element = (
      <input
        onChange={this.textChanged.bind(this)}
        type="text"
        id="spInput"
      />
    );

    let dashboard: JSX.Element = (
      <WpDashboard listTitle={this.state.text}></WpDashboard>
    );

    let component: JSX.Element = (
      <Component listTitle="test"></Component>
    );

    let btn: JSX.Element = (
      <button onClick={this.btnClicked.bind(this)}>Call WS</button>
    );

    let logoutBtn: JSX.Element = (
      <button onClick={this.btnLogoutClicked.bind(this)}>LOGOUT</button>
    );

    let loginBtn: JSX.Element = (
      <button onClick={this.btnLoginClicked.bind(this)}>LOGIN</button>
    );

    let json: JSX.Element = <ReactJson src={this.state.wsData}></ReactJson>;

    return (
      <div>
        {loginBtn}
        {btn}
        {logoutBtn}
        {input}
        {this.state.text && this.state.text !== "" && dashboard}
        { component }
        {/* <div>{json}</div> */}
      </div>
    );
  }

  btnLoginClicked = async (e: any) => {
    e.preventDefault();

    const authProvider: AuthProvider = new AuthProvider();

    if (authProvider.Account) {
      alert("User has been signed in...");
      return;
    }

    await authProvider.signIn();
  };

  btnLogoutClicked = async (e: any) => {
    e.preventDefault();

    const authProvider: AuthProvider = new AuthProvider();

    await authProvider.signOut();
  };

  btnClicked = async (e: any) => {
    e.preventDefault();

    const authProvider: AuthProvider = new AuthProvider();

    if (!authProvider.Account) {
      alert("User login requested, please sign in first");

      return;
    }

    let tr = await authProvider.getTokenPopUp({
      scopes: msalSettings.tokenRequest.scopes
    });

    const grapCallResult = await fetch(msalSettings.graphConfig.graphSites, {
      headers: {
        Authorization: `Bearer ${tr.accessToken}`
      }
    });

    const json = await grapCallResult.json();

    this.setState((s, p) => {
      let state = { ...s };
      state.wsData = json;
      return state;
    });

    console.info(json);
  };

  textChanged(event: any) {
    const val = event.target.value;
    this.setState({ text: val });
  }
}


ReactDOM.render(<App />, document.querySelector("#appTestContainer"));

// ReactDOM.render(
//         <WpDashboard listTitle={"Test"}></WpDashboard>,
//          document.querySelector("#appTestContainer")
//          );

// export function GetReact(){

//     let e = document.createElement("div");
//     // e.setAttribute("id", "app");

//     // document.appendChild(e);

//    ReactDOM.render(<h1>REACT APP....</h1>, document.querySelector("#DeltaPlaceHolderPageTitleInTitleArea"));
// }

// export function Greet(name : string){
//     let svc : Service = new Service(name);
//     svc.Greet();
// }

// export function GetListsJsom(){
//     var ctx = SP.ClientContext.get_current();
//     var list = ctx.get_web().get_lists().getByTitle("Dokumenty");

//     ctx.load(list);
//     ctx.executeQueryAsync(function(){
//         console.log(list.get_title());
//     },
//     function(err){  console.log(err); });
// }

// export function Array(a : []){
//     a.filter((v, i)=>{
//         console.log(v);
//     })
// }
