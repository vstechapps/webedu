import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less']
})
export class ProjectsComponent {

  linkEnabled=false;

  projects=[{
    name:"Advice Connect",
    about:"Financial Planning Application",
    text:"Advice & Planning platform developed for Investment Banking which connects Financial Advisors with Clients. It helps Advisors to understand their clients better and helps advisors in creating best investment plans which will help clients to achieve their goals"
  },{
    name:"Project Keystone",
    about:"Health Claim Processing System",
    text:"Next Gen Claim Validation and Auto Adjudication system developed for leading Health Insurance Client.  Developed multiple microservices for end to end process automation by orchestration of various modules and business rules"
  },{
    name:"GST Portal",
    about:"Online GST Portal for B2B",
    text:"Online GST Invoice management application developed for Airline Ticket. It helps B2B Customers to request and Download GST Invoices for the travel performed by other business. It supports bulk invoice generation feature for business travels"
  },{
    name:"Superbolt Recorder",
    about:"Chrome Plugin for Automation Testing",
    text:"Developed a chrome plugin called SuperBolt Recorder which is useful for automation testing of client application. QA can easily Record and Execute the test flows using this tool, reduces lot of manual effort required to write test scripts"
  },{
    name:"MDM",
    about:"Master Data Management Web App",
    text:"Master Data Management is a web based data management tool which facilitates the users to create/update the tables and data online including user permission management and complete audit log tracking"
  },{
    name:"AD FS Integration",
    about:"SSO Integration for Enterprise Apps",
    text:"Integrated Active Directory Federation Services for all corporate applications to have single sign on for multiple apps using OAuth 2.0 & JWT Validation and created single space of Identity and Access management"
  },{
    name:"DMS - Alfresco",
    about:"Document Management System using ECM",
    text:"DMS is built on the open source Alfresco tool for managing the business documents online. Customized the Alfresco CMS according to the Biz requirements Implemented the automated mailing system and workflow to track the status between management team and users. Developed Alfresco Webscripts and Alfresco Share UI pages"
  }]

}
