# Microfrontends SAAS Application

An application applying microfrontends architecture to a SAAS website, hosted with Amazon Web Services' CloudFront CDN and S3 cloud storage. Built with NodeJS, JavaScript, Webpack Module Federation, HTML, React, React Router, Vue, and Material UI, along with CSS-in-JS scoped for each microfrontend. My annotations are included in the code as documentation and as proof of my understanding.

**_View this project:_** [https://d18h8go6ao2yr1.cloudfront.net/](https://d18h8go6ao2yr1.cloudfront.net/)

## Project Description

The entire application integrates three independent, or remote, front-end sub-applications--**marketing**, **auth**, and **dashboard**--within an encapsulating **container**, or host, front-end application at run-time. Each of these four applications simulates in effect a separate development team in a fictional large company, TechTonix Solutions. The emphasis is not on questions of visual style or content but, instead, on higher-order questions of architectural structure and codebase design, along with the tricky configuration of production and development environments to promote the long-term autonomy of teams with potentially differing technical needs.

Accordingly, the application is not concerned with implementing the functionality of the SAAS site. It includes no database, remote server, API, or real authentication. This project is concerned with the internal organization of the code and on how all the parts relate to the whole, with the website content and pre-made visual components serving chiefly as a plausible use case for such an approach.

It's not uncommon for microfrontends to cause issues in production that don't arise in development. Coding this project afforded me extensive experience in debugging and troubleshooting highly technical problems that commonly arise and confuse developers when implementing microfrontends architectures.

## What Are Microfrontends?

Microfrontends divide an otherwise monolithic front-end application into smaller independent applications, each responsible for a distinct feature. There is no direct communication, nor are there any direct dependencies between them. A container application determines when and where to show the sub-appliations. Each smaller application is easier to understand and develop, while new features are easily integrated later. A major advantage is that multiple engineering teams can work autonomously on their given feature and determine which technologies to use based on the specific technical requirements of the feature and the technical preferences of the team. In the long term, due to zero coupling between child applications and the near-zero coupling between child applications and the container application, technologies and version specifications can easily be switched out without threatening to break the entire application.

Nevertheless, a microfrontends architecture is tricky to assemble and presents unique challenges in development and in production.

## Architectural Requirements

All architectural decisions should be driven and informed by an in-depth understanding of the specific requirements of the product or project. My code meets all of the following inflexible requirements:

1. Zero coupling between child apps. -- No importing of functions, objects, classes, etc., and no shared state, although shared libraries through Module Federation is okay.

2. Near-zero coupling between container and child apps. -- The container shouldn’t assume that a child is using a particular framework. Note, for example, that the **dashboard** subapp uses Vue while the other apps use React, without any errors arising. Any necessary communication is done with callbacks or simple events. Caveat: the auth (i.e. authentication) child app must communicate with the container at some point to convey to the container that the user is signed in or out.

3. CSS from one project should never affect another. Making changes to one (sub-)application should not break another. -- Therefore, all CSS-in-JS is scoped.

4. Version control (monorepo vs separate) shouldn’t have any impact on the overall project. -- A monorepo was selected to forgo unnecessary complexity in an already-complex project.

5. The container should be able to decide to always use the latest version of a microfrontend OR make use of a specific version. -- The container will always use the latest version of a child app, which doesn’t require a redeploy of container. Alternatively, the container can specify exactly what version of a child it wants to use, which does require a redeploy to reflect the change.

### Secondary Technologies & Techniques

AWS CloudFront CDN distribution configuration; AWS S3 Bucket configuration; AWS IAM user setup; AWS CLI; AWS invalidations to resolve an issue with caching in production; Memory History and Browser History syncinc between parent and child apps for proper routing; Git version control; GitHub Actions secret variables; GitHub Actions Workflows with YAML configurations for streamlined CI/CD pipeline; CSS-in-JS scoping; Webpack configuration for common, development, and production settings; Webpack Module Federation plugin; Webpack HTML plugin; Babel loader(s); deep dive into publicPath property to ensure proper access to files in production and in development; lazy loading of subapps to enhance performance so that subapps are only loaded as necessary; Diagrams.net (for visualizing microfrontends architecture); zsh (command line); Google Chrome Developer Tools Console and Network tab monitoring while testing functionality, shared dependencies, and independence or integration of sub-apps for performance considerations; Picsum (to populate random photos on cards); asynchronous script loading via import function calls; conditional rendering of sub-apps based on environment variables; React Router routing (updated to v6 syntax); React function components, hooks, and state.

My advanced Microfrontends SAAS Application builds on prior learning about the basics of microfrontends architecture, as demonstrated by an earlier project I coded, available here with full technical specs: [https://github.com/AddyLopez/microfrontends-app](https://github.com/AddyLopez/microfrontends-app)

### Usage

Navigate to the project's URL in the browser. The **marketing** sub-app comprises the landing and pricing pages; the **auth** sub-app comprises the sign-in and sign-up pages (The entry of personal information is not required; simply click through either of the authentication pages.); the **dashboard** is accessible once the user clicks through either of the authentication pages; and the **container** app comprises the sub-apps and is visible as the header.

To run the program locally, spin up servers in four separate terminals from the _container_, _marketing_, _auth_, and _dashboard_ directories by running the command _npm start_. To view each app, respectively, navigate to the following in the browser: _http://localhost/8080_, _http://localhost/8081_, _http://localhost/8082/auth/sign-in_ or _http://localhost/8082/auth/sign-up_, and/or _http://localhost/8083_. Sub-apps can be viewed and worked on independently without altering the overarching container.

### Course Attribution

This learning project was instructed by Stephen Grider in his course [Microfrontends with React: A Complete Developer's Guide](https://www.udemy.com/course/microfrontend-course/?couponCode=CP260817G1).
