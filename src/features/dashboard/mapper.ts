import { CheckCircle2, ReceiptText, UserRound } from "lucide-react";
import { createElement } from "react";

import type {
  DashboardApiResponse,
  DashboardApplicationResource,
  DashboardData,
  DashboardIncludedResource,
} from "./types";

const EMPTY_VALUE = "Belum tersedia";

function getFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || EMPTY_VALUE;
}

function formatDate(value: string) {
  if (!value) return EMPTY_VALUE;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return EMPTY_VALUE;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function findIncludedResource(
  included: DashboardIncludedResource[],
  identifier?: { id: string } | null,
) {
  return included.find((resource) => resource.id === identifier?.id);
}

function getStudyProgram(
  application: DashboardApplicationResource,
  included: DashboardIncludedResource[],
) {
  const choiceIdentifier =
    application.relationships?.studyProgramChoices?.data?.[0];

  const choice = findIncludedResource(included, choiceIdentifier);

  const studyProgramIdentifier = choice?.relationships?.studyProgram?.data;

  return findIncludedResource(included, studyProgramIdentifier);
}

function getFaculty(
  studyProgram: DashboardIncludedResource | undefined,
  included: DashboardIncludedResource[],
) {
  const facultyIdentifier = studyProgram?.relationships?.faculty?.data;

  return findIncludedResource(included, facultyIdentifier);
}

export function mapDashboardResponse(
  response: DashboardApiResponse,
): DashboardData {
  const application = response.data;
  const included = response.included ?? [];
  const attributes = application.attributes;

  const programChoices =
    application.relationships?.studyProgramChoices?.data ?? [];

  const admissionPeriod = findIncludedResource(
    included,
    application.relationships?.admissionPeriod?.data,
  );
  const admissionPath = findIncludedResource(
    included,
    application.relationships?.admissionPath?.data,
  );
  const classSchedule = findIncludedResource(
    included,
    application.relationships?.classShedule?.data,
  );

  const studyProgram = getStudyProgram(application, included);
  const faculty = getFaculty(studyProgram, included);
  const hasApplication = Boolean(application.id);

  return {
    registrationNumber: attributes.registration_number,
    fullName: attributes.full_name,
    registeredAt: formatDate(attributes.created_at),
    firstName: getFirstName(attributes.full_name),
    eyebrow: "Tahap 3 dari 5",
    titleDescription:
      "Akunmu sudah aktif. Pantau progres, periksa pilihan studi, dan lanjutkan setiap tahap penerimaan dari dashboard ini.",

    statuses: [
      {
        label: "Status pendaftaran",
        value: hasApplication ? "Pendaftaran aktif" : EMPTY_VALUE,
        description: `${programChoices.length} pilihan program studi tercatat`,
        icon: createElement(CheckCircle2, {
          className: "size-5",
        }),
        tone: "emerald",
      },
      {
        label: "Nama pendaftar",
        value: attributes.full_name || EMPTY_VALUE,
        description: `Dibuat ${formatDate(attributes.created_at)}`,
        icon: createElement(UserRound, {
          className: "size-5",
        }),
        tone: "blue",
      },
      {
        label: "Nomor pendaftaran",
        value: attributes.registration_number || EMPTY_VALUE,
        description: "Nomor pendaftaran",
        icon: createElement(ReceiptText, {
          className: "size-5",
        }),
        tone: "cyan",
      },
    ],

    processSteps: [
      {
        id: "program",
        label: "Pilih program studi",
        description: "Program studi dan jalur masuk sudah dipilih.",
        status: hasApplication ? "completed" : "upcoming",
      },
      {
        id: "account",
        label: "Buat akun",
        description: "Akun pendaftaranmu sudah aktif.",
        status: hasApplication ? "completed" : "upcoming",
      },
      {
        id: "payment",
        label: "Pembayaran",
        description: "Bayar biaya pendaftaran untuk membuka formulir.",
        status: "upcoming",
      },
      {
        id: "form",
        label: "Isi formulir",
        description: "Lengkapi data diri dan dokumen pendaftaran.",
        status: "upcoming",
      },
      {
        id: "selection",
        label: "Jadwal seleksi",
        description: "Pantau jadwal dan hasil seleksi penerimaan.",
        status: "upcoming",
      },
    ],

    selection: {
      institutionName: EMPTY_VALUE,
      level: studyProgram?.attributes.level ?? EMPTY_VALUE,
      faculty: faculty?.attributes.name ?? EMPTY_VALUE,
      programName: studyProgram?.attributes.name ?? EMPTY_VALUE,
      waveName: admissionPeriod?.attributes.name ?? EMPTY_VALUE,
      studySystem: classSchedule?.attributes.name ?? EMPTY_VALUE,
      admissionPathName: admissionPath?.attributes.name ?? EMPTY_VALUE,
      registrationFee: EMPTY_VALUE,
    },

    nextAction: "Data pendaftaranmu berhasil dimuat dari sistem.",
    nextActionLabel: "Lihat pendaftaran",
    nextActionHref: "/pendaftaran",
  };
}
