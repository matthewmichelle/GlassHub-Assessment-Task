import loadServicesContainer from './service.container';
import { loadExpress } from './express';
import { Application } from 'express';
import ApplicationDataSource from '../data'

export default function ({ express: app }: { express: Application }) {
    // load servicesContainer
    // load express App    
    ApplicationDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
        const servicesContainer = loadServicesContainer(ApplicationDataSource);
        loadExpress(app, servicesContainer)
    })
}