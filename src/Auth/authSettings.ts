import { UserAgentApplication, Logger, LogLevel } from "msal";

export const msalApp = new UserAgentApplication({
    auth :{
        authority: "https://login.microsoftonline.com/xxx.aaa.com",
        clientId : "XXX",
        redirectUri : "http://localhost:8081"
    },
    cache:{
        cacheLocation : "localStorage"
    },
    system: {
        navigateFrameWait: 500,
        logger: new Logger((logLevel, message) => {
            console.log(message);
        }, {
            level: LogLevel.Verbose,
            piiLoggingEnabled: true
        })
    }
});

export const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
  };

export const tokenRequest = {
    scopes: ["Mail.Read", "Group.Read.All", "Sites.Read.All", "Sites.ReadWrite.All"]
  };

  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
    graphGroups: "https://graph.microsoft.com/v1.0/groups?$select=id,displayName&$filter=startsWith(displayName, 'rh')&$top=5",
    graphSites : "https://graph.microsoft.com/v1.0/sites/root"
  };