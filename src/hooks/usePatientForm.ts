import { useState } from "react";
import type { Patient } from "../types/patient";
import type { PatientFormData } from "../types/patient";

const emptyForm: PatientFormData = {
  name: "",
  avatar: "",
  description: "",
  website: "",
};

export function usePatientForm() {
  const [formData, setFormData] =
    useState<PatientFormData>(emptyForm);

  function resetForm() {
    setFormData(emptyForm);
  }

  function fillForm(patient: Patient) {
    setFormData({
      name: patient.name,
      avatar: patient.avatar,
      description: patient.description,
      website: patient.website,
    });
  }

  return {
    formData,
    setFormData,
    resetForm,
    fillForm,
  };
}