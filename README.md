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

Remaining 
- Send/ignore the user card from Feed
- Signup New user
- E2E Testing

Compont structure 
Body. 
    NavBar
    Route=/ => Feed
    Route=/login => Login
    Route=/connections => Connections 
    Route=/profile => profile

