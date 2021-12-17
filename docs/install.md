# First install

## Prerequisites 📓

Before to complete all of the following steps:

- Install `aws-cli`

  Linux :

  ```bash
  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  ```

  MacOs :

  ```bash
  https://awscli.amazonaws.com/AWSCLIV2.pkg
  ```

- Install [`zsh-nvm`](https://github.com/lukechilds/zsh-nvm), with [auto-use enabled](https://github.com/lukechilds/zsh-nvm#auto-use)
- Have a dev account dedicated to Canopia on the Theodo AWS organization. You should be able to log in through the [Theodo AWS SSO portal](https://theodo.awsapps.com/start#/)

## Getting started 🚀

- Clone the repo: `git clone git@github.com:theodo/canopia.git`
- Run `yarn` at the root of the repo
- Create your developer user on the [IAM console](https://console.aws.amazon.com/iam/home?region=eu-west-1#/home):
  - Go to **Users**
  - Click on **Add users**
  - Enter `test-stack-orchestrator` as the name
  - Check the **Access key - Programmatic access** checkbox
  - Click on **Next: Permissions**
  - Click on **Attach existing policies directly**
  - Check the **AdministratorAccess** checkbox
  - Skip all the remaining steps until **Create user**
  - ⚠️ Retrieve your **\$USER_ACCESS_KEY** and **\$USER_SECRET_ACCESS_KEY** ⚠️
- Configure this user as a new `test-stack-orchestrator` profile on your machine by running the following command `aws configure --profile test-stack-orchestrator` :
  - AWS Access Key ID : _\$USER_ACCESS_KEY_
  - AWS Secret Access Key : _\$USER_SECRET_ACCESS_KEY_
  - Default region name : `eu-west-1`
  - Default output format : `json`
- Create the role assumed by CloudFormation during the deployments:
  - Still on IAM, open the [policies tab](https://console.aws.amazon.com/iam/home?region=eu-west-1#/policies), and create a policy
  - Use the JSON editor and copy-paste the [Cloudformation role policy](./resources/cfn-role-service-policy.json)
  - Name the policy `cfn-role-policy`, and submit
  - Next, open the [roles tab](https://console.aws.amazon.com/iam/home?region=eu-west-1#/roles) and create a role
  - Select the AWS service Cloudformation as a trusted entity, attach the `cfn-role-policy`, name the role `cfn-role` to the role and submit
  - Next, open the `cfn-role` page and the [trust relationships tab](https://console.aws.amazon.com/iam/home?region=eu-west-1#/roles/cfn-role?section=trust)
  - Edit the trust relationship to add the [Lambda AWS Service](./resources/cfn-role-trust-relationships.json)
  - Finally, write down the **\$CFN_ROLE_ARN**
- Copy `.env.example` as `.env.local`
  - Set `CFN_ROLE_ARN` in both file with the value of the last step
- Deploy

  ```bash
  yarn deploy
  ```

[You now can now develop](./development.md)
