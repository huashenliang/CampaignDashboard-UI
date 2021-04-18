Run in local env:
- npm install
- npm run start 
- visit localhost:3000
- api should be running at port 4000

Project Structure:
- Pages:
    -   Campaign List page:
        - Display a list of campaigns
        - Click on each record will redirect to dashboard page with detail metrics 

    -   Dashboard page:
        - Sidebar to toggle between boards and navigate back to Campagin List page 
        - Display data in live charts and cards according to board type

- Components:
    -   Sidebar Component
    -   Card Component
    -   Simple Line Chart Component
    -   Main Line Chart Component
    -   Datagrid Component 
    -   Header Component 
    -   Dashboard Components

CI/CD Process:
    -   Push to main branch to trigger pipeline (AWS Codepipeline)
    -   Build docker image and push to AWS ECR
    -   Using eks-deployment.yml to deploy to the cluster
    -   kubernetes folder contains ingress and service config yaml.

