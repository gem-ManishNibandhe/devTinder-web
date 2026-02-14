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


# AWS code deployment 
- Sign up to AWs account 
- Create EC2 instance nad launch intance 
- chmod 400 "DevTinder-secret.pem" - type in termainal in downloads folder - after .pem file downloaded 
- connect to machine using     ssh -i "DevTinder-secret.pem" ubuntu@ec2-3-107-239-210.ap-southeast-2.compute.amazonaws.com. (logins to system)
- Install node in instance  - Go to offical website and follow . Make sure to install exact version of node which          is install in your system. Node 24.11.1. 
# Frontend 
    - clone git repo to instance uding git clone https://github.com/gem-ManishNibandhe/devTinder.git

    - install npm packages npm i in AWS. - install dependencies 
    - Build the app - npm run build
    - sudo apt update - to update the system
    - sudo apy install nginx  - to run app and load to http 
    Start nginx 
    - sudo systemctl start nginx 
    - sudo systemctl enable nginx
    - Copy code from dist(buid file) /var/www/html
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 on your instance.  - instance->security-> security group ->add port and save.

# Backend
   - npm run start/npm start
   - allowed ec2 instance public IP on mongodb server 
   - pm (process manager)
   - Installed npm install pm2  -g    - keeps your server running in the background
   - pm2 start npm -- start    /// or  pm2 start npm --name "devTinderBackend" -- start. (adds process name)

   - pm2 logs. - to check the logs 
   - pm2 flush npm   -  removes all the logs
   - pm2 list, pm2 flust <name> ,pm2 stop <name> , pm2 delete <name>


    # nginx congig
    Frontend = devTinder.com
    Backend = devTinder.com:7777 => devTinder.com/api

    sudo nano /etc/nginx/
    ngix config  - > etc/nginx/available-sites/default
    to point to localhost:7777 to api/ we need to make nginx prosy pass 
    Add below code in nginx file - >. etc/nginx/available-sites/default

    server_name 3.107.239.210;


    location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
    }

    - Restart nginx -> sudo systemctl restart nginx 
    - Modify the BASe_URL  in frontend project to "/api"

# Adding a custom Domian Name

 - purchase domain namr from godaddy
 - signup on cloudflare & add a new domain name 
 - change the name servers on godaddy and point to cloudflare 
 - Wait for sometime till your nameserver gets updated ~ 20mins
 - DNS record : A devtinders.shop 3.107.239.210
 - Enable SSL for website


 # Sending Email using SES
 - Create an IAM user 
 - Give access to AmazonSESFullAcess
 - Amazon SES: Create an Identity
 - Verify your domian name 
 - Verify your email address / identity
 - Get the domain CNAME and add in cloudflare DNS ->records
 - Install AWS SDK - v3 
 - Code Example : https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
 - Setup sesClient 
 - Access Credentials should be created in IAM under SecurityCredentials Tab
 - Add the credentilas to. the .env file
 - Write code for sesClient 
 - Write code for Sending email address 
 - Make the email dynamic by passing more params to the run function

