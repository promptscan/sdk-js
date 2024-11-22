import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Data: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  StringOrNumber: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Action = {
  name: Scalars['String']['output'];
  requiredMembershipType: Maybe<Membership>;
  resourceType: Scalars['String']['output'];
};

export type ApiKey = {
  createdTs: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  scope: Scalars['String']['output'];
  usage: Maybe<ApiKeyUsage>;
  value: Scalars['String']['output'];
};

export type ApiKeyInfo = {
  owner: Maybe<Scalars['String']['output']>;
};

export type ApiKeyMutationResult = {
  data: Maybe<ApiKey>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type ApiKeyUsage = {
  lastUsedTs: Maybe<Scalars['DateTime']['output']>;
  processedGenerationsCount: Maybe<Scalars['Int']['output']>;
};

export type AuthConfig = {
  iconUrl: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  redirectUrl: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type CompletionTokensDetailsInput = {
  audioTokens: InputMaybe<Scalars['Int']['input']>;
  reasoningTokens: InputMaybe<Scalars['Int']['input']>;
};

export type DateTimeGranularity =
  | 'day'
  | 'hour'
  | 'month'
  | 'week';

export type Detector = {
  categories: Maybe<Array<Scalars['String']['output']>>;
  createdTs: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  evaluationRecords: Maybe<Array<DetectorEvaluationRecord>>;
  id: Scalars['UUID']['output'];
  isGlobal: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  outputSpec: Maybe<DetectorOutputSpec>;
  owner: Maybe<DetectorOwner>;
  policies: Maybe<Array<Policy>>;
  projects: Maybe<Array<Project>>;
  promptSpec: Maybe<DetectorPromptSpec>;
  testRecord: Maybe<DetectorEvaluationRecord>;
  updatedTs: Maybe<Scalars['DateTime']['output']>;
};

export type DetectorEvaluationMessage = {
  content: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type DetectorEvaluationRecord = {
  description: Maybe<Scalars['String']['output']>;
  expectedOutput: Maybe<Scalars['StringOrNumber']['output']>;
  id: Scalars['UUID']['output'];
  messages: Array<DetectorEvaluationMessage>;
  outputName: Scalars['String']['output'];
  previewMessage: Maybe<Scalars['String']['output']>;
};

export type DetectorEvaluationRecordInput = {
  description: InputMaybe<Scalars['String']['input']>;
  expectedOutput: InputMaybe<Scalars['StringOrNumber']['input']>;
  messages: InputMaybe<Array<GenerationMessageInput>>;
  outputName: Scalars['String']['input'];
};

export type DetectorEvaluationRecordResult = {
  expectedFeatureExtracted: Scalars['Boolean']['output'];
  features: Maybe<Array<GenerationFeature>>;
  record: DetectorEvaluationRecord;
};

export type DetectorEvaluationResult = {
  data: Maybe<Array<DetectorEvaluationRecordResult>>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type DetectorFilterInput = {
  includeGlobal: InputMaybe<Scalars['Boolean']['input']>;
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type DetectorInput = {
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  outputSpec: InputMaybe<DetectorOutputSpecInput>;
  promptSpec: InputMaybe<DetectorPromptSpecInput>;
  testRecord: InputMaybe<DetectorEvaluationRecordInput>;
};

export type DetectorModelProvider =
  | 'openai';

export type DetectorMutationResult = {
  data: Maybe<Detector>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type DetectorOutput = {
  description: Maybe<Scalars['String']['output']>;
  index: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  values: Maybe<Array<Scalars['String']['output']>>;
};

export type DetectorOutputInput = {
  description: InputMaybe<Scalars['String']['input']>;
  index: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  values: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DetectorOutputSpec = {
  additionalOutputsAllowed: Maybe<Scalars['Boolean']['output']>;
  multipleOutputsAllowed: Maybe<Scalars['Boolean']['output']>;
  outputs: Maybe<Array<DetectorOutput>>;
  type: DetectorOutputType;
};

export type DetectorOutputSpecInput = {
  additionalOutputsAllowed: InputMaybe<Scalars['Boolean']['input']>;
  multipleOutputsAllowed: InputMaybe<Scalars['Boolean']['input']>;
  outputs: InputMaybe<Array<DetectorOutputInput>>;
  type: Scalars['String']['input'];
};

export type DetectorOutputType =
  | 'entity'
  | 'number'
  | 'text';

export type DetectorOwner = Project | Tenant | User;

export type DetectorPromptSpec = {
  conversationTemplate: Maybe<Scalars['String']['output']>;
  implementationClass: Maybe<Scalars['String']['output']>;
  template: Scalars['String']['output'];
};

export type DetectorPromptSpecInput = {
  conversationTemplate: InputMaybe<Scalars['String']['input']>;
  implementationClass: InputMaybe<Scalars['String']['input']>;
  template: Scalars['String']['input'];
};

export type DetectorResultPage = {
  items: Maybe<Array<Detector>>;
  pageInfo: PageInfo;
};

export type DetectorSuggestion = {
  categories: Maybe<Array<Scalars['String']['output']>>;
  description: Maybe<Scalars['String']['output']>;
  evaluationRecords: Maybe<Array<DetectorEvaluationRecord>>;
  name: Scalars['String']['output'];
  outputSpec: Maybe<DetectorOutputSpec>;
  promptSpec: Maybe<DetectorPromptSpec>;
};

export type DetectorUsageFilterInput = {
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  relativeTimeDelta: InputMaybe<Scalars['String']['input']>;
};

export type DetectorUsageStatsDimension =
  | 'extracted_name'
  | 'extraction'
  | 'invocation';

export type EntityLocation = {
  end: Scalars['Int']['output'];
  messageIndex: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type EvaluationError = {
  detector: Maybe<Detector>;
  message: Scalars['String']['output'];
};

export type EvaluationResult = {
  data: Maybe<Array<GenerationInsights>>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type ExtractionError = {
  detector: Maybe<Detector>;
  message: Scalars['String']['output'];
};

export type ExtractionTimeout = {
  detector: Maybe<Detector>;
  timeout: Scalars['Float']['output'];
};

export type Generation = {
  createdTs: Maybe<Scalars['DateTime']['output']>;
  duration: Maybe<Scalars['Float']['output']>;
  external_id: Maybe<Scalars['String']['output']>;
  features: Maybe<Array<GenerationFeature>>;
  id: Scalars['String']['output'];
  issues: Maybe<Array<Issue>>;
  messages: Maybe<Array<GenerationMessage>>;
  model: Scalars['String']['output'];
  previewMessage: Maybe<Scalars['String']['output']>;
  project: Project;
  session_id: Maybe<Scalars['String']['output']>;
  tags: Maybe<Array<KeyValuePair>>;
  timeToFirstToken: Maybe<Scalars['Float']['output']>;
  turns: Maybe<Scalars['Int']['output']>;
  usage: GenerationUsage;
};


export type GenerationFeaturesArgs = {
  names: InputMaybe<Array<Scalars['String']['input']>>;
};

export type GenerationFeature = {
  detector: Maybe<Detector>;
  explanation: Maybe<Scalars['String']['output']>;
  generation: Generation;
  locations: Maybe<Array<EntityLocation>>;
  /** @deprecated No longer supported */
  name: Scalars['String']['output'];
  outputName: Scalars['String']['output'];
  outputType: Scalars['String']['output'];
  processingDurationSeconds: Maybe<Scalars['Float']['output']>;
  processingTs: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['StringOrNumber']['output'];
};

export type GenerationFeatureFilterInput = {
  hasTagKeys: InputMaybe<Array<Scalars['String']['input']>>;
  outputName: InputMaybe<Scalars['String']['input']>;
  outputValues: InputMaybe<Array<Scalars['StringOrNumber']['input']>>;
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  query: InputMaybe<Scalars['String']['input']>;
  relativeTimeDelta: InputMaybe<Scalars['String']['input']>;
  semanticGroupIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  tags: InputMaybe<Array<KeyValuePairInput>>;
};

export type GenerationFeatureResultPage = {
  items: Array<GenerationFeature>;
  pageInfo: Maybe<PageInfo>;
};

export type GenerationFeatureSpec = {
  detectors: Maybe<Array<Detector>>;
  outputName: Scalars['String']['output'];
  outputType: Scalars['String']['output'];
  project: Project;
  stats: Array<StatsMetric>;
};


export type GenerationFeatureSpecStatsArgs = {
  granularity?: InputMaybe<DateTimeGranularity>;
  relativeTimeDelta?: InputMaybe<Scalars['String']['input']>;
};

export type GenerationFeatureSpecResultPage = {
  items: Array<GenerationFeatureSpec>;
  pageInfo: Maybe<PageInfo>;
};

export type GenerationFilterInput = {
  hasTagKeys: InputMaybe<Array<Scalars['String']['input']>>;
  models: InputMaybe<Array<Scalars['String']['input']>>;
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  query: InputMaybe<Scalars['String']['input']>;
  relativeTimeDelta: Scalars['String']['input'];
  tags: InputMaybe<Array<KeyValuePairInput>>;
};

export type GenerationGroupDimension =
  | 'model'
  | 'project';

export type GenerationInput = {
  created: InputMaybe<Scalars['DateTime']['input']>;
  duration: InputMaybe<Scalars['Float']['input']>;
  id: InputMaybe<Scalars['String']['input']>;
  messages: Array<GenerationMessageInput>;
  meta: InputMaybe<Array<KeyValuePairInput>>;
  model: Scalars['String']['input'];
  sessionId: InputMaybe<Scalars['String']['input']>;
  timeToFirstToken: InputMaybe<Scalars['Float']['input']>;
  usage: InputMaybe<UsageInput>;
};

export type GenerationInsights = {
  errors: Maybe<Array<ExtractionError>>;
  evaluationErrors: Maybe<Array<EvaluationError>>;
  features: Maybe<Array<GenerationFeature>>;
  issues: Maybe<Array<Issue>>;
  reason: Maybe<Scalars['String']['output']>;
  timeouts: Maybe<Array<ExtractionTimeout>>;
};

export type GenerationMessage = {
  content: Scalars['String']['output'];
  role: Scalars['String']['output'];
  tags: Maybe<Array<KeyValuePair>>;
};

export type GenerationMessageInput = {
  content: Scalars['String']['input'];
  role: Scalars['String']['input'];
  tags: InputMaybe<Array<KeyValuePairInput>>;
};

export type GenerationResultPage = {
  items: Array<Generation>;
  pageInfo: Maybe<PageInfo>;
};

export type GenerationTagGroupDimension =
  | 'key'
  | 'value';

export type GenerationUsage = {
  completionTokens: Maybe<Scalars['Int']['output']>;
  promptTokens: Maybe<Scalars['Int']['output']>;
  totalTokens: Maybe<Scalars['Int']['output']>;
};

export type Issue = {
  category: Scalars['String']['output'];
  generation: Maybe<Generation>;
  id: Maybe<Scalars['UUID']['output']>;
  message: Scalars['String']['output'];
  processingTs: Scalars['DateTime']['output'];
  severity: Severity;
  tags: Maybe<Array<KeyValuePair>>;
};

export type IssueFilterInput = {
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  hasTagKeys: InputMaybe<Array<Scalars['String']['input']>>;
  models: InputMaybe<Array<Scalars['String']['input']>>;
  policyIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  policyRuleIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  relativeTimeDelta: InputMaybe<Scalars['String']['input']>;
  severities: InputMaybe<Array<Severity>>;
  tags: InputMaybe<Array<KeyValuePairInput>>;
};

export type IssueGroup = {
  dimensions: Array<StatsMetricDimension>;
  items: Maybe<Array<Issue>>;
};

export type IssueGroupDimension =
  | 'category'
  | 'model'
  | 'policy'
  | 'project'
  | 'rule'
  | 'severity';

export type IssueGroupResultPage = {
  items: Maybe<Array<IssueGroup>>;
  pageInfo: Maybe<PageInfo>;
};

export type IssueResultPage = {
  items: Array<Issue>;
  pageInfo: Maybe<PageInfo>;
};

export type KeyValuePair = {
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type KeyValuePairInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Membership = {
  createdTs: Maybe<Scalars['DateTime']['output']>;
  level: MembershipLevel;
};

export type MembershipLevel =
  | 'member'
  | 'owner'
  | 'reader';

export type MetricResultPage = {
  items: Array<StatsMetric>;
  pageInfo: Maybe<PageInfo>;
};

export type Mutation = {
  addDetectorEvaluationRecord: DetectorMutationResult;
  addPolicyEvaluationRecord: PolicyMutationResult;
  addPolicyRule: Maybe<PolicyRuleMutationResult>;
  analyzeGeneration: GenerationInsights;
  assignDetectorToProject: MutationResult;
  assignPolicyToProject: Maybe<MutationResult>;
  calculateSemanticGroups: SemanticGroupMutationResult;
  collect: MutationResult;
  createApiKey: ApiKeyMutationResult;
  createDetector: DetectorMutationResult;
  createPolicy: Maybe<PolicyMutationResult>;
  createProject: ProjectMutationResult;
  createProjectApiKey: ApiKeyMutationResult;
  deleteDetector: MutationResult;
  deletePolicy: Maybe<MutationResult>;
  deletePolicyRule: Maybe<MutationResult>;
  deleteProject: MutationResult;
  deleteProjectApiKey: MutationResult;
  evaluateDetectorRecords: DetectorEvaluationResult;
  evaluatePolicyRecords: PolicyEvaluationResult;
  logout: Maybe<MutationResult>;
  removeDetectorEvaluationRecord: DetectorMutationResult;
  removeDetectorFromProject: MutationResult;
  removePolicyEvaluationRecord: PolicyMutationResult;
  removePolicyFromProject: Maybe<MutationResult>;
  selectTenant: Maybe<MutationResult>;
  setProjectMembership: MutationResult;
  setTenantMembership: MutationResult;
  updateDetector: DetectorMutationResult;
  updatePolicy: Maybe<PolicyMutationResult>;
  updatePolicyRule: Maybe<PolicyRuleMutationResult>;
  updateProject: ProjectMutationResult;
};


export type MutationAddDetectorEvaluationRecordArgs = {
  detectorId: Scalars['UUID']['input'];
  evaluationRecord: DetectorEvaluationRecordInput;
};


export type MutationAddPolicyEvaluationRecordArgs = {
  evaluationRecord: PolicyEvaluationRecordInput;
  policyId: Scalars['UUID']['input'];
};


export type MutationAddPolicyRuleArgs = {
  policyId: Scalars['UUID']['input'];
  rule: PolicyRuleInput;
};


export type MutationAnalyzeGenerationArgs = {
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  generation: GenerationInput;
  projectId: InputMaybe<Scalars['UUID']['input']>;
  severities: InputMaybe<Array<Severity>>;
  timeout: InputMaybe<Scalars['Float']['input']>;
};


export type MutationAssignDetectorToProjectArgs = {
  detectorId: Scalars['UUID']['input'];
  projectId: Scalars['UUID']['input'];
};


export type MutationAssignPolicyToProjectArgs = {
  policyId: Scalars['UUID']['input'];
  projectId: Scalars['UUID']['input'];
};


export type MutationCalculateSemanticGroupsArgs = {
  key: Scalars['String']['input'];
  maxSamples: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['UUID']['input'];
  relativeTimeDelta: InputMaybe<Scalars['String']['input']>;
};


export type MutationCollectArgs = {
  generations: Array<GenerationInput>;
  projectId: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationCreateApiKeyArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateDetectorArgs = {
  detector: DetectorInput;
  projectId: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationCreatePolicyArgs = {
  policy: PolicyInput;
  projectId: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationCreateProjectArgs = {
  project: ProjectInput;
};


export type MutationCreateProjectApiKeyArgs = {
  name: Scalars['String']['input'];
  projectId: Scalars['UUID']['input'];
};


export type MutationDeleteDetectorArgs = {
  detectorId: Scalars['UUID']['input'];
};


export type MutationDeletePolicyArgs = {
  policyId: Scalars['UUID']['input'];
};


export type MutationDeletePolicyRuleArgs = {
  policyId: Scalars['UUID']['input'];
  ruleId: Scalars['UUID']['input'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['UUID']['input'];
};


export type MutationDeleteProjectApiKeyArgs = {
  keyId: Scalars['UUID']['input'];
};


export type MutationEvaluateDetectorRecordsArgs = {
  detector: InputMaybe<DetectorInput>;
  detectorId: InputMaybe<Scalars['UUID']['input']>;
  records: InputMaybe<Array<DetectorEvaluationRecordInput>>;
};


export type MutationEvaluatePolicyRecordsArgs = {
  policyId: Scalars['UUID']['input'];
  records: InputMaybe<Array<PolicyEvaluationRecordInput>>;
};


export type MutationRemoveDetectorEvaluationRecordArgs = {
  detectorId: Scalars['UUID']['input'];
  evaluationRecordId: Scalars['UUID']['input'];
};


export type MutationRemoveDetectorFromProjectArgs = {
  detectorId: Scalars['UUID']['input'];
  projectId: Scalars['UUID']['input'];
};


export type MutationRemovePolicyEvaluationRecordArgs = {
  evaluationRecordId: Scalars['UUID']['input'];
  policyId: Scalars['UUID']['input'];
};


export type MutationRemovePolicyFromProjectArgs = {
  policyId: Scalars['UUID']['input'];
  projectId: Scalars['UUID']['input'];
};


export type MutationSelectTenantArgs = {
  tenantId: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationSetProjectMembershipArgs = {
  level: InputMaybe<MembershipLevel>;
  projectId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type MutationSetTenantMembershipArgs = {
  level: InputMaybe<MembershipLevel>;
  userId: Scalars['UUID']['input'];
};


export type MutationUpdateDetectorArgs = {
  detector: DetectorInput;
  detectorId: Scalars['UUID']['input'];
};


export type MutationUpdatePolicyArgs = {
  policy: PolicyInput;
  policyId: Scalars['UUID']['input'];
};


export type MutationUpdatePolicyRuleArgs = {
  policyId: Scalars['UUID']['input'];
  rule: PolicyRuleInput;
  ruleId: Scalars['UUID']['input'];
};


export type MutationUpdateProjectArgs = {
  project: ProjectInput;
  projectId: Scalars['UUID']['input'];
};

export type MutationError = {
  message: Scalars['String']['output'];
  type: Maybe<MutationErrorType>;
};

export type MutationErrorType =
  | 'evaluation'
  | 'permission';

export type MutationResult = {
  data: Maybe<Scalars['Data']['output']>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type PageInfo = {
  hasNext: Scalars['Boolean']['output'];
  index: Scalars['Int']['output'];
};

export type PageInput = {
  index: InputMaybe<Scalars['Int']['input']>;
  size: InputMaybe<Scalars['Int']['input']>;
};

export type Policy = {
  categories: Maybe<Array<Scalars['String']['output']>>;
  description: Maybe<Scalars['String']['output']>;
  evaluationRecords: Maybe<Array<PolicyEvaluationRecord>>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  owner: Maybe<DetectorOwner>;
  projects: Maybe<Array<Project>>;
  rules: Maybe<Array<PolicyRule>>;
};

export type PolicyEvaluationRecord = {
  description: Maybe<Scalars['String']['output']>;
  expectedCategory: Scalars['String']['output'];
  expectedSeverity: Severity;
  id: Scalars['UUID']['output'];
  messages: Array<DetectorEvaluationMessage>;
  previewMessage: Maybe<Scalars['String']['output']>;
};

export type PolicyEvaluationRecordInput = {
  description: InputMaybe<Scalars['String']['input']>;
  expectedCategory: Scalars['String']['input'];
  expectedSeverity: Severity;
  messages: InputMaybe<Array<GenerationMessageInput>>;
};

export type PolicyEvaluationRecordResult = {
  expectedIssueCreated: Scalars['Boolean']['output'];
  features: Maybe<Array<GenerationFeature>>;
  issues: Maybe<Array<Issue>>;
  record: PolicyEvaluationRecord;
};

export type PolicyEvaluationResult = {
  data: Maybe<Array<PolicyEvaluationRecordResult>>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type PolicyFilterInput = {
  includeGlobal: InputMaybe<Scalars['Boolean']['input']>;
  query: InputMaybe<Scalars['String']['input']>;
};

export type PolicyInput = {
  categories: InputMaybe<Array<Scalars['String']['input']>>;
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type PolicyMutationResult = {
  data: Maybe<Policy>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type PolicyResultPage = {
  items: Maybe<Array<Policy>>;
  pageInfo: PageInfo;
};

export type PolicyRule = {
  category: Scalars['String']['output'];
  description: Maybe<Scalars['String']['output']>;
  detector: Detector;
  id: Scalars['UUID']['output'];
  matchValues: Maybe<Array<Scalars['String']['output']>>;
  message: Scalars['String']['output'];
  outputName: Scalars['String']['output'];
  severity: Severity;
};

export type PolicyRuleInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  detector_id: Scalars['UUID']['input'];
  matchValues: InputMaybe<Array<Scalars['String']['input']>>;
  message: Scalars['String']['input'];
  outputName: Scalars['String']['input'];
  severity: Severity;
};

export type PolicyRuleMutationResult = {
  data: Maybe<PolicyRule>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type Project = {
  apiKeys: Maybe<Array<ApiKey>>;
  createdTs: Maybe<Scalars['DateTime']['output']>;
  currentUserMembership: Maybe<Membership>;
  description: Maybe<Scalars['String']['output']>;
  detectors: Array<Detector>;
  id: Scalars['UUID']['output'];
  members: Array<UserMembership>;
  name: Scalars['String']['output'];
  owner: Maybe<ProjectOwner>;
  policies: Array<Policy>;
};

export type ProjectInput = {
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ProjectMutationResult = {
  data: Maybe<Project>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type ProjectOwner = Tenant | User;

export type ProjectResultPage = {
  items: Maybe<Array<Project>>;
  pageInfo: PageInfo;
};

export type PromptTokensDetailsInput = {
  audioTokens: InputMaybe<Scalars['Int']['input']>;
  cachedTokens: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  apiKey: Maybe<ApiKey>;
  authForEmail: Maybe<AuthConfig>;
  authProviders: Maybe<Array<AuthConfig>>;
  detector: Detector;
  detectorUsageStats: Maybe<Array<StatsMetric>>;
  detectors: DetectorResultPage;
  generation: Maybe<Generation>;
  generationFeatureSpecs: GenerationFeatureSpecResultPage;
  generationFeatures: Maybe<GenerationFeatureResultPage>;
  generationFeaturesStats: Maybe<Array<StatsMetric>>;
  generationStats: Maybe<Array<StatsMetric>>;
  generations: GenerationResultPage;
  issue: Maybe<Issue>;
  issues: IssueResultPage;
  issuesStats: Maybe<Array<StatsMetric>>;
  policies: Maybe<PolicyResultPage>;
  policy: Maybe<Policy>;
  project: Project;
  projects: ProjectResultPage;
  semanticGroup: Maybe<SemanticGroup>;
  semanticGroupStats: Maybe<Array<StatsMetric>>;
  semanticGroups: SemanticGroupResultPage;
  suggestDetectorSpec: Maybe<DetectorSuggestion>;
  suggestPolicyEvaluationRecords: Scalars['Data']['output'];
  tags: MetricResultPage;
  user: Maybe<User>;
  users: UserResultPage;
  whoami: User;
};


export type QueryAuthForEmailArgs = {
  email: Scalars['String']['input'];
  redirectUrl: InputMaybe<Scalars['String']['input']>;
};


export type QueryAuthProvidersArgs = {
  redirectUrl: InputMaybe<Scalars['String']['input']>;
};


export type QueryDetectorArgs = {
  detectorId: Scalars['UUID']['input'];
};


export type QueryDetectorUsageStatsArgs = {
  dimensions: Array<DetectorUsageStatsDimension>;
  filterBy: InputMaybe<DetectorUsageFilterInput>;
  granularity?: InputMaybe<DateTimeGranularity>;
  maxMetricsPerPeriod?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryDetectorsArgs = {
  filterBy: InputMaybe<DetectorFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryGenerationArgs = {
  generationId: Scalars['UUID']['input'];
};


export type QueryGenerationFeatureSpecsArgs = {
  filterBy: InputMaybe<GenerationFeatureFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryGenerationFeaturesArgs = {
  filterBy: InputMaybe<GenerationFeatureFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryGenerationFeaturesStatsArgs = {
  filterBy: InputMaybe<GenerationFeatureFilterInput>;
};


export type QueryGenerationStatsArgs = {
  dimensions: Array<GenerationGroupDimension>;
  filterBy: InputMaybe<GenerationFilterInput>;
  granularity?: DateTimeGranularity;
  maxMetricsPerPeriod?: Scalars['Int']['input'];
};


export type QueryGenerationsArgs = {
  filterBy: InputMaybe<GenerationFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryIssueArgs = {
  issueId: Scalars['UUID']['input'];
};


export type QueryIssuesArgs = {
  filterBy: InputMaybe<IssueFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryIssuesStatsArgs = {
  dimensions: Array<IssueGroupDimension>;
  filterBy: InputMaybe<IssueFilterInput>;
  granularity?: InputMaybe<DateTimeGranularity>;
  maxMetricsPerPeriod?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPoliciesArgs = {
  filterBy: InputMaybe<PolicyFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryPolicyArgs = {
  policyId: Scalars['UUID']['input'];
};


export type QueryProjectArgs = {
  projectId: Scalars['UUID']['input'];
};


export type QueryProjectsArgs = {
  page: InputMaybe<PageInput>;
};


export type QuerySemanticGroupArgs = {
  groupId: Scalars['UUID']['input'];
};


export type QuerySemanticGroupStatsArgs = {
  filterBy: InputMaybe<SemanticGroupFilterInput>;
  granularity?: InputMaybe<DateTimeGranularity>;
  groupBy: InputMaybe<Array<SemanticGroupDimension>>;
  maxMetricsPerPeriod?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySemanticGroupsArgs = {
  filterBy: InputMaybe<SemanticGroupFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QuerySuggestDetectorSpecArgs = {
  description: Scalars['String']['input'];
};


export type QuerySuggestPolicyEvaluationRecordsArgs = {
  policyId: Scalars['UUID']['input'];
};


export type QueryTagsArgs = {
  dimensions: Array<GenerationTagGroupDimension>;
  filterBy: InputMaybe<TagFilterInput>;
  page: InputMaybe<PageInput>;
};


export type QueryUserArgs = {
  page: InputMaybe<PageInput>;
  userId: Scalars['UUID']['input'];
};


export type QueryUsersArgs = {
  filter_by: UserFilterInput;
};

export type SemanticGroup = {
  id: Scalars['UUID']['output'];
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  project: Project;
  stats: Array<StatsMetric>;
};


export type SemanticGroupStatsArgs = {
  granularity?: InputMaybe<DateTimeGranularity>;
  relativeTimeDelta?: InputMaybe<Scalars['String']['input']>;
};

export type SemanticGroupDimension =
  | 'group_id';

export type SemanticGroupFilterInput = {
  generationTags: InputMaybe<Array<KeyValuePairInput>>;
  groupKeys: InputMaybe<Array<Scalars['String']['input']>>;
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  relativeTimeDelta: InputMaybe<Scalars['String']['input']>;
};

export type SemanticGroupMutationResult = {
  data: Maybe<Array<SemanticGroup>>;
  error: Maybe<MutationError>;
  success: Scalars['Boolean']['output'];
};

export type SemanticGroupResultPage = {
  items: Array<SemanticGroup>;
  pageInfo: Maybe<PageInfo>;
};

export type Severity =
  | 'critical'
  | 'high'
  | 'info'
  | 'low'
  | 'medium';

export type StatsMetric = {
  change: Maybe<Scalars['Float']['output']>;
  dimensions: Maybe<Array<StatsMetricDimension>>;
  timestamp: Scalars['DateTime']['output'];
  unit: Maybe<Scalars['String']['output']>;
  value: Scalars['Float']['output'];
};

export type StatsMetricDimension = {
  /** @deprecated No longer supported */
  dimension: Scalars['String']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TagFilterInput = {
  projectIds: InputMaybe<Array<Scalars['UUID']['input']>>;
  relativeTimeDelta: InputMaybe<Scalars['String']['input']>;
};

export type Tenant = {
  createdTs: Maybe<Scalars['DateTime']['output']>;
  currentUserMembership: Maybe<Membership>;
  emailDomains: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  projects: Maybe<Array<Project>>;
  slug: Scalars['String']['output'];
};

export type UsageInput = {
  completionTokens: InputMaybe<Scalars['Int']['input']>;
  completionTokensDetails: InputMaybe<CompletionTokensDetailsInput>;
  promptTokens: InputMaybe<Scalars['Int']['input']>;
  promptTokensDetails: InputMaybe<PromptTokensDetailsInput>;
  totalTokens: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  apiKeys: Maybe<Array<ApiKey>>;
  authenticatedTenant: Maybe<Tenant>;
  avatarUrl: Maybe<Scalars['String']['output']>;
  createdTs: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  projects: Maybe<Array<Project>>;
  tenants: Maybe<Array<Tenant>>;
};

export type UserFilterInput = {
  query: InputMaybe<Scalars['String']['input']>;
  user_ids: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type UserMembership = {
  createdTs: Maybe<Scalars['DateTime']['output']>;
  level: MembershipLevel;
  user: User;
};

export type UserResultPage = {
  items: Array<User>;
  pageInfo: Maybe<PageInfo>;
};

export type CollectGenerationsMutationVariables = Exact<{
  generations: Array<GenerationInput> | GenerationInput;
  projectId: InputMaybe<Scalars['UUID']['input']>;
}>;


export type CollectGenerationsMutation = { collect: { success: boolean, error: { message: string } | null } };

export type ApiKeyQueryVariables = Exact<{ [key: string]: never; }>;


export type ApiKeyQuery = { apiKey: { name: string, scope: string, createdTs: any, enabled: boolean } | null };


export const CollectGenerationsDocument = gql`
    mutation collectGenerations($generations: [GenerationInput!]!, $projectId: UUID) {
  collect(generations: $generations, projectId: $projectId) {
    success
    error {
      message
    }
  }
}
    `;
export const ApiKeyDocument = gql`
    query apiKey {
  apiKey {
    name
    scope
    createdTs
    enabled
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    collectGenerations(variables: CollectGenerationsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CollectGenerationsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectGenerationsMutation>(CollectGenerationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'collectGenerations', 'mutation', variables);
    },
    apiKey(variables?: ApiKeyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ApiKeyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApiKeyQuery>(ApiKeyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'apiKey', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;