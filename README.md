# Description
Dummmy project to test deployment workflow into Kubernetes from a NestJS project with a monorepo structure by using ArgoCD. 
Workflows are based on Github Actions, built images are stored into specific AWS ECR private repositories.

Main problem with monorepos is to detect wich apps were changed to just deploy those that needs to be updated, taking into account that sometimes there is specific files that could affect to all the apps (like general package.json, package-lock.json or yarn.lock). Provided Github Actions from this repository takes all these things into account to just deploy the apps that needs to be deployed.

Project structure was created by NestJS cli:

```bash
nest new nest-js-github-actions-monorepo
cd nest-js-github-actions-monorepo
nest generate app app1
nest generate app app2
nest generate app app3
nest generate app app4
```

All deployments make changes into an ArgoCD repository created for testing purposes located in https://github.com/CristianBB/testArgocd

# Environment
## Repository
Repository needs two princpal branches and any other branch by issue/feature (used normally on teams) 

- **main** ⇒ Only code deployed or ready to deploy into production
- **develop** ⇒ Only code deployed or ready to deploy into beta
- **other branches by issue/feature** ⇒ Specific branches created to work in a specific issue/feature. These branches could be deployed into alpha at any moment

## Kubernetes 
For this sample, kubernetes cluster is managed with 3 branches:
- **production** => Where production services will run
- **beta** => Where staging services will run
- **alpha** => Mainly used for delevopers for testing specific branches

## ArgoCD
For this sample, ArgoCD applications are configured to track a repository located on https://github.com/CristianBB/testArgocd
Deployment steps from github actions will make changes into that repository

# Deployment workflow
Provided github actions from this sample works as follows:

- **Push into main branch**:
    - **IF changes affects to all apps** (package.json, yarn.lock) ⇒ Build all apps, push into ECR and make changes into ArgoCD repo for PRODUCTION namespace
    - **IF changes affects only to specific apps** ⇒ Build changed aps, push into ECR and deploy and make changes into ArgoCD repo for PRODUCTION namespace
- **Push into develop branch**:
    - **IF changes affects to all apps** (package.json, yarn.lock) ⇒ Build all apps, push into ECR and make changes into ArgoCD repo for BETA namespace
    - **IF changes affects only to specific apps** ⇒ Build changed aps, push into ECR and deploy and make changes into ArgoCD repo for BETA namespace
- **Manual** pipeline launch: From github actions we can set a pipeline to allow us to select specific app to deploy (or all) and namespace where deploy (production, beta, alpha). By this way we cover any need for even deploy hotfixes in a fast way.

# Configuring repository
Provided Github actions needs some secrets that needs to be stored into repository secrets (located on {{your repo uri}}/settings/secrets/actions:
- **ARGOCD_REPO**: Github repository where ArgoCD changes needs to be done with new generated images (format: my-org/my-tools) 
- **AWS_ACCESS_KEY_ID**: AWS Access Key with AmazonEC2ContainerRegistryFullAccess permissions
- **AWS_SECRET_ACCESS_KEY**: AWS Secret Access Key with AmazonEC2ContainerRegistryFullAccess permissions
- **PAT_DEPLOY**: Personal access token to use for making changes into the ArgoCD repository. To create a PAT go to https://github.com/settings/tokens with a logged user with permissions to make changes into ArgoCD repository

# Configuring Github actions
Following variables needs to be set inside manual-deploy.yml and auto-deploy-push.yml workflows:

- **AWS_REGION**: AWS region where your ECR private repositories are created. In this sample they're set to ```eu-west-1```. I tried to store it into a Github secret but then Github actions detects this value and doesn't allow to write this value to ArgoCD repository (It doesn't return any error, just write and empty line when you try to write this variable or asterisks when you try to display it in the output)

# How it works:
There is two main workflows defined into .github/workflows directory: 
- auto-deploy-push.yml
- manual-deploy.yml

The other files are reusable workflows used by the two previous workflows mentioned

## auto-deploy-push.yml
Triggered when there is a Push into main or develop branches ONLY when there is changes inside apps/ dir, package.json or yarn.lock. 

It detects the files modified to decide if all apps needs to be build & deployed or only some of them that has been modified. 

Based on the branch that triggers the workflow, makes the deploy into Beta or Production namespaces. 

If new apps are created there is no need to make any change if the app is created inside apps/ dir

## manual-deploy.yml
Triggered manually from Actions section.

Allows to select a specific app to deploy or ALL apps

Allows to select the destination environment: alpha, beta, production

If new apps are created only need to change the available choices to add the new app name
