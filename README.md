# DevTinder

-Creatd a Vite+React projects (npm create vite@latest devTinder-web -- -- template react)
-Install Tailwind Csss
- Add NavBar component to App.jsx
- Create a NavBar.jsx Separate file component
- Install react-router-dom
- Create BrowserRouter -> Routes - > Route=/ Body - > RouteChilderen
- Create an Outlet in your Body component
- Create a footer
- Create a Login Page
- Install axios 
- CORS - install cors in backend => add middleware to with configiurations: origin ,credentials:true
- whenever you are making API call so pass axios => {withCredentials:true} // if not passed it will not send the token back to api call
- Install Redux toolkit https://redux-toolkit.js.org/tutorials/quick-start
- Install react-redux + @reduxjs/toolkit = >Create a configure a store => Provider => create a slice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store 
- NavBar should update as soon as user logs in 
- Refactor our code to add constants file + create a components folder 
- You should not be able to acces other routes without login
- If token is not present , redirect. the user. to login page
- Logout feature
- Get the feed and add the feed in the store
- Profile
- Edit Profile feature
- show Toast on save of profile save
- See all my connections
- New Page - see all my connections 
- New Page - see all my connection requests
- Feature - Accept/Reject Connection Request
- Send/ignore the user card from Feed

Remaining 
- Signup New user
- E2E Testing

Compont structure 
Body. 
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections 
    Route=/profile => profile


# AWS Frontend code deployment 
- Sign up to AWs account 
- Create EC2 instance nad launch intance 
- chmod 400 "DevTinder-secret.pem" - type in termainal in downloads folder - after .pem file downloaded 
- connect to machine using     ssh -i "DevTinder-secret.pem" ubuntu@ec2-3-107-239-210.ap-southeast-2.compute.amazonaws.com. (logins to system)
- Install node in instance  - Go to offical website and follow . Make sure to install exact version of node which          is install in your system. Node 24.11.1. 
- clone git repo to instance uding git clone https://github.com/gem-ManishNibandhe/devTinder.git

- install npm packages npm i in AWS
- Build the app - npm run build
