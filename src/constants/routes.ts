export const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    STUDY_PROGRAM: "/pilih-prodi",
  },

  DASHBOARD: {
    HOME: "/dashboard",
    PAYMENT: "/dashboard/pembayaran",
    FORM: "/dashboard/formulir",
    FORM_BIODATA: "/dashboard/formulir/biodata",
    FORM_ADDRESS: "/dashboard/formulir/alamat",
    FORM_SCHOOL: "/dashboard/formulir/sekolah",
    SCHEDULE: "/dashboard/jadwal",
    ANNOUNCEMENT: "/dashboard/pengumuman",
    RE_REGISTRATION: "/dashboard/daftar-ulang",
  },
} as const;
