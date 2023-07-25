export interface PortalError {
  userAccount: string;
  affectedService: string;
  code: string;
  verboseDescription: string;
  technicalDescription: string;
  timeOfOccurrence: string;
}
