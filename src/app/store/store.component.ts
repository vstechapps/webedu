import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent {

  apps=[{
    name:"IAM",
    about:"Identity and Access Management",
    route:"iam",
    text:"Centralized Repository for User Management. Authenticate / Authorize users and maintain trust between users and applications. Manage User roles, permissions and business policies. Control access levels for the users."
  },{
    name:"ECM",
    about:"Enterprise Content Management",
    route:"ecm",
    text:"Create Content, Review, Collaborate across Teams, Publish content to public. In-built support of ready to use content types which are trending out. Use Content Modelling, Customize models as per business rules"
  },{
    name:"BPM",
    about:"Business Process Management",
    route:"bpm",
    text:"Easily create automated workflows required for our business process. Send out Alerts / Reminders to employees / managers / clients based on business rules. Eliminate manual supervision of business process"
  },{
    name:"MDM",
    about:"Master Data Management",
    route:"mdm",
    text:"Establish and Maintain a Master Database as single source of truth for your business data. Write Once Read Many. Do RealTime updates according to market situtations. Easily create Secure API and integrate with other business apps"
  },{
    name:"APM",
    about:"Agile Project Management",
    route:"apm",
    text:"Simple Tool providing ability to manage design and development projects. Create Agile boards, Plan Timeline, Slice down user stories, Assign projects roles to team. Track progress and effeciency of agile teams. Build successful business solutions."
  },{
    name:"ERP",
    about:"Enterprise Resource Planning",
    route:"erp",
    text:"Estimate Budgets for inventory, human resources, workplace maintenance, administration and operations costs. Compare with market and plan the budget to support business and technology operations in cost effective way"
  },{
    name:"CRM",
    about:"Customer Relationship Management",
    route:"crm",
    text:"Identify leads, Build Marketing Teams to showcase business products, Turn Leads into Prospects and then into Clients. Track Product sales and Provide efficient customer support. Get feedback from clients and build new products with updated features"
  },{
    name:"SRT",
    about:"Service Request Tracker",
    route:"srt",
    text:"Easily create tickets for issue / incident / service requests, get it assigned to responsible team, define service level agreements. Notify status to concerned users. Collaborate and Track down to resolution."
  },{
    name:"QSA",
    about:"Quick Start App",
    route:"qsa",
    text:"Quickly start creating a web / mobile app without any code. Create your design and easily turn it into working application. Follows No Code Low Code Principles. Reduce Development efforts and help us to quickly launch app into market"
  },{
    name:"AQA",
    about:"Automation of Quality Assurance",
    route:"aqa",
    text:"Create Automated Tests, record virtual test flows just like how users use our application features. Simulate tests with different set of test data and validate test results. Assert functionality and app performance. Upgrade product quality"
  },{
    name:"BETA",
    about:"Business Expense Tracking and Approval",
    route:"beta",
    text:"Track and Supervise business expenses spent by us / our staff / employees / other team members. Get the expense bills uploaded into system, Do Validate and Approve. Eliminate the chances of spending unnecessary expenses"
  },{
    name:"FHD",
    about:"Financial Health Dashboard",
    route:"fhd",
    text:"Visualize and Track Sales Reports, Revenue Charts in Realtime. Apply Business Intelligence & Data Analytics on reported data. Take right business decisions to improve long term financial health of business."
  }]


}
