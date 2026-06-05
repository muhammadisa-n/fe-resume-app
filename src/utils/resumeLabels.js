// src/utils/resumeLabels.js
export const resumeLabels = {
  en: {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    present: "Present",
    gpa: "GPA",
    fullNamePlaceholder: "Enter Your Full Name",
  },
  id: {
    summary: "Ringkasan",
    experience: "Pengalaman",
    education: "Pendidikan",
    projects: "Proyek",
    skills: "Keahlian",
    present: "Sekarang",
    gpa: "IPK",
    fullNamePlaceholder: "Masukkan Nama Lengkap",
  },
};

export const getResumeLabels = (language = "en") => {
  return resumeLabels[language] || resumeLabels.en;
};
