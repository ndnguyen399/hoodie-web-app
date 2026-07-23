/**
 * @author duynguyen © 2025
 */
import type { CodeSearchDomainModel, ProfileDomainModel, SearchResponse, UserAddressesDomainModel, UserAddressInitialApplicationModel } from "../common/Models";

export interface PageProps {
  isPanel?: boolean;
  onDismiss?: (params?: any) => void;
}

export interface PageState {
  profileDomainModel: ProfileDomainModel;
  userAddressesDomainModel: SearchResponse<UserAddressesDomainModel>;
  images?: ProfileImageViewModel[];
  genderAC?: SearchResponse<CodeSearchDomainModel>;
  editing: boolean;
  activeTab: number;
  loading: boolean;
  isSubmitting: boolean;

  // Form địa chỉ
  addressFormOpen: boolean;
  editingAddress: boolean;
  userAddressInitialApplicationModel: UserAddressInitialApplicationModel;
}
export interface ProfileImageViewModel {
  imageId?: number;
  imageUrl?: string;
  file?: File;
  name: string;
  isNew: boolean;
}