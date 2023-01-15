Visit live site: http://dashboard.huashenliang.com/

Run in local env using Docker:
- docker build -t react-dashboard .
- docker run -p 3000:80 react-dashboard
- visit localhost:3000
- make sure you have clone https://github.com/huashenliang/dashboard-api and your local api is running at port 4000, 
- Uncomment the code section in /src/Store/index.ts to view redux dev tool for local development

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
    -   Push to prod branch to trigger pipeline (AWS Codepipeline)
    -   Using buildspec.yml to Build docker image and push to AWS ECR
    -   Using eks-deployment.yml to deploy to the cluster
    -   Kubernetes cluster configed ALB to do the routing
    -   ./kubernetes folder contains ingress and service config yaml.

