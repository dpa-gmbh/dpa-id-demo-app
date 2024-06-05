import { Construct } from 'constructs'
import { IRole } from 'aws-cdk-lib/aws-iam'
import {
  ContainerImage,
  FargateTaskDefinition,
  LogDriver,
  Protocol
} from 'aws-cdk-lib/aws-ecs'
import {DeploymentSettings} from '../../config/configuration'
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs'
import { RemovalPolicy } from 'aws-cdk-lib'
import {Repository} from "aws-cdk-lib/aws-ecr";

export interface TaskDefinitionProperties {
  applicationRole: IRole
  settings: DeploymentSettings
}

export class DpaIdFrontendTaskDefinition extends Construct {
  public readonly instance: FargateTaskDefinition

  constructor(scope: Construct, id: string, props: TaskDefinitionProperties) {
    super(scope, id)

    /**
     * Creating role for application.
     */
    const logGroup = new LogGroup(this, 'AppLogGroup', {
      logGroupName: `/dpa-id-auth0-spa-demo/${props.settings.stageSuffix}`,
      retention: RetentionDays.SIX_MONTHS,
      removalPolicy: RemovalPolicy.DESTROY
    })

    this.instance = new FargateTaskDefinition(this, 'TaskDefinition', {
      taskRole: props.applicationRole
    })

    let environment = props.settings.environment;
    this.instance.addContainer('Container', {
      image: ContainerImage.fromEcrRepository(Repository.fromRepositoryArn(this, "ecr-repo",
          props.settings.repositoryArn), props.settings.imageTag),
      portMappings: [
        { containerPort: props.settings.applicationPort, protocol: Protocol.TCP }
      ],
      environment: environment,
      containerName: `dpa-id-auth0-spa-demo-Container-${props.settings.stageSuffix}`,
      logging: LogDriver.awsLogs({
        streamPrefix: 'dpaidauth0spademo',
        logGroup
      }),
      essential: true
    })
  }
}
