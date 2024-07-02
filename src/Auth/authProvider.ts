import { msalApp, loginRequest } from "./authSettings";
import { AuthenticationParameters, AuthResponse, Account } from "msal";

export class AuthProvider{

    public get Account() : Account { return msalApp.getAccount(); }

    public signIn =  async () => {
        let authParams : AuthenticationParameters = {
            scopes : loginRequest.scopes
        }

        try
        {
            let loginResult = await msalApp.loginPopup(authParams)

            alert("Login successfull...");

            console.info(loginResult);

        }
        catch(err){
            console.error(err);
        }
    }

    public getTokenPopUp = async (req : AuthenticationParameters) : Promise<AuthResponse> => {

        try
        {
            return await msalApp.acquireTokenSilent(req);
        }
        catch(err)
        {
            return await msalApp.acquireTokenPopup(req);
        }
    }

    public signOut = () =>{
        msalApp.logout();
    }
}
