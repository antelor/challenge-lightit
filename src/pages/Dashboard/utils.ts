import type { PatientFormData } from "../../types/patient";

function normalizeUrl(url: string): string {
  const trimmed = url.trim();

  if (!trimmed) return trimmed;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function normalizePatientFormData(
  data: PatientFormData
): PatientFormData {
  return {
    ...data,

    name: data.name.trim(),

    description: data.description.trim(),

    avatar: normalizeUrl(data.avatar),

    website: normalizeUrl(data.website),
  };
}