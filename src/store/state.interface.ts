export interface AppState {
   applicationData: { 
    subMenu: Array<string>,
    routeData:  {
        work:Array<Object>, 
        splash: Array<Object>,
        news: Array<Object>,
        exhibitions: Array<Object>,
        press: Array<Object>,
        about: Array<Object>,
        contact: Array<Object>
    },
    menuPresent: boolean,
    popUp: boolean
   }

}