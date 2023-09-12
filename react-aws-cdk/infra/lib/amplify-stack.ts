import { Stack, StackProps, SecretValue } from "aws-cdk-lib";
import { Construct } from "constructs";
import { BuildSpec } from "aws-cdk-lib/aws-codebuild";
import { App, GitHubSourceCodeProvider } from "@aws-cdk/aws-amplify-alpha";

export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const amplifyAppName = "test App";

    const amplifyApp = new App(this, amplifyAppName, {
      environmentVariables: {
        AMPLIFY_MONOREPO_APP_ROOT: "react-aws-cdk/frontend",
      },
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: "janganacode",
        repository: "youtube",
        oauthToken: SecretValue.secretsManager("github-token"),
      }),
      buildSpec: BuildSpec.fromObjectToYaml({
        version: "1.0",
        applications: [
          {
            frontend: {
              phases: {
                preBuild: {
                  commands: ["npm ci"],
                },
                build: {
                  commands: ["npm run build"],
                },
              },
              artifacts: {
                baseDirectory: "build",
                files: ["**/*"],
              },
              cache: {
                paths: ["node_modules/**/*"],
              },
            },
            appRoot: "react-aws-cdk/frontend",
          },
        ],
      }),
    });
    const mainBranch = amplifyApp.addBranch("react-aws-cdk");
  }
}
