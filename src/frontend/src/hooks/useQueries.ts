import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Form,
  FormSubmission,
  GalleryItem,
  Post,
  Scheme,
  ServiceLink,
  SiteInfo,
  UserProfile,
} from "../backend.d";
import { FormCategory, SubmissionStatus, UserRole } from "../backend.d";
import { useActor } from "./useActor";

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function usePublishedPosts(language?: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", language],
    queryFn: async () => {
      if (!actor) return [];
      if (language && language !== "all") {
        return actor.getPublishedPostsByLanguage(language);
      }
      return actor.getAllPublishedPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["allPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      language: string;
      published: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPost(
        data.title,
        data.content,
        data.language,
        data.published,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["allPosts"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (postId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deletePost(postId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["allPosts"] });
    },
  });
}

export function useGalleryItems() {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      type: string;
      blob: import("../backend").ExternalBlob;
      caption: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addGalleryItem(data.type, data.blob, data.caption);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteGalleryItem(itemId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useActiveSchemes() {
  const { actor, isFetching } = useActor();
  return useQuery<Scheme[]>({
    queryKey: ["schemes", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllActiveSchemes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllSchemes() {
  const { actor, isFetching } = useActor();
  return useQuery<Scheme[]>({
    queryKey: ["schemes", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSchemes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddScheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
      documentsRequired: string[];
      applicationLink: string;
      active: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addScheme(
        data.title,
        data.description,
        data.category,
        data.documentsRequired,
        data.applicationLink,
        data.active,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schemes"] });
    },
  });
}

export function useEditScheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      description: string;
      category: string;
      documentsRequired: string[];
      applicationLink: string;
      active: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.editScheme(
        data.id,
        data.title,
        data.description,
        data.category,
        data.documentsRequired,
        data.applicationLink,
        data.active,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schemes"] }),
  });
}

export function useDeleteScheme() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteScheme(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schemes"] }),
  });
}

export function useServiceLinks() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceLink[]>({
    queryKey: ["serviceLinks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceLinks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddServiceLink() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      url: string;
      category: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addServiceLink(
        data.name,
        data.url,
        data.category,
        data.description,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceLinks"] }),
  });
}

export function useEditServiceLink() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      url: string;
      category: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.editServiceLink(
        data.id,
        data.name,
        data.url,
        data.category,
        data.description,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceLinks"] }),
  });
}

export function useDeleteServiceLink() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteServiceLink(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["serviceLinks"] }),
  });
}

export function useAllForms() {
  const { actor, isFetching } = useActor();
  return useQuery<Form[]>({
    queryKey: ["forms", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllForms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddForm() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: FormCategory;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addForm(
        data.title,
        data.category,
        data.description,
        0n,
        [],
        "",
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forms"] }),
  });
}

export function useEditForm() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      category: FormCategory;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.editForm(
        data.id,
        data.title,
        data.category,
        data.description,
        0n,
        [],
        "",
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forms"] }),
  });
}

export function useDeleteForm() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteForm(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["forms"] }),
  });
}

export function useSiteInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<SiteInfo | null>({
    queryKey: ["siteInfo"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSiteInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      phone: string;
      whatsapp: string;
      email: string;
      address: string;
      socialLinks: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSiteInfo(
        data.phone,
        data.whatsapp,
        data.email,
        data.address,
        data.socialLinks,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["siteInfo"] }),
  });
}

export function useAllSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<FormSubmission[]>({
    queryKey: ["allSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMySubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery<FormSubmission[]>({
    queryKey: ["mySubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSubmissionStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: SubmissionStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSubmissionStatus(id, status);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allSubmissions"] }),
  });
}

export function useSubmitForm() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      formId,
      fieldValues,
    }: { formId: bigint; fieldValues: Array<[string, Uint8Array]> }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitFormSubmission(formId, fieldValues);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mySubmissions"] }),
  });
}

export { FormCategory, SubmissionStatus };
