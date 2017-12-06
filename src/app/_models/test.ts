import { TestType, Profile } from './index';
export class Test {
  public url: string;
  public name: string;
  public data: string;
  public providerId: string;
  public providerProfile: Profile;
  public testTypeId: number;
  public testType: TestType;
}
