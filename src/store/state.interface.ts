export interface AppState {
   data: { 
    subMenu: Array<string>,
    applicationData:  {
        work:Array<Object>, 
        splash: Array<Object>,
        news: Array<Object>,
        exhibitions: Array<Object>,
        press: Array<Object>,
        about: Array<Object>,
        contact: Array<Object>
    }
   }

}