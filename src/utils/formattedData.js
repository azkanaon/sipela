export const formatDate = (dateInput) => {
  // Memastikan dateInput adalah objek Date
  const date = new Date(dateInput);

  // Menggunakan toLocaleDateString dengan opsi yang diinginkan
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });
};

export const formatDateWithoutDay = (dateInput) => {
  // Memastikan dateInput adalah objek Date
  const date = new Date(dateInput);

  // Menggunakan toLocaleDateString dengan opsi yang diinginkan
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (dateInput) => {
  const date = new Date(dateInput);

  // Menggunakan toLocaleDateString dengan opsi yang diinginkan
  return date.toLocaleTimeString("ID-id", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const groupedMessagesByDay = (messages) => {
  const x = messages.reduce((acc, message) => {
    const messageDate = formatDate(message.timestamp);

    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }

    acc[messageDate].push(message);
    return acc;
  }, {});

  return x;
};

export const timeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const difference = Math.floor((now - time) / 1000); // Selisih dalam detik

  if (difference < 60) return `${difference} detik yang lalu`;
  if (difference < 3600)
    return `${Math.floor(difference / 60)} menit yang lalu`;
  if (difference < 86400)
    return `${Math.floor(difference / 3600)} jam yang lalu`;
  if (difference < 2592000)
    return `${Math.floor(difference / 86400)} hari yang lalu`;
  return `${Math.floor(difference / 2592000)} bulan yang lalu`;
};

export const getDayName = (dateString) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const date = new Date(dateString);
  return days[date.getDay()];
};

export const getDay = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate(); // Tanggal

  return day;
};

export const getMonth = (dateString) => {
  const date = new Date(dateString);

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const month = months[date.getMonth()];

  return month;
};

export const getYear = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();

  return year;
};

export const numberToWords = (number) => {
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];

  const belasan = [
    "sepuluh",
    "sebelas",
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
    "enam belas",
    "tujuh belas",
    "delapan belas",
    "sembilan belas",
  ];

  const puluhan = [
    "",
    "",
    "dua puluh",
    "tiga puluh",
    "empat puluh",
    "lima puluh",
    "enam puluh",
    "tujuh puluh",
    "delapan puluh",
    "sembilan puluh",
  ];

  if (number < 10) {
    return satuan[number];
  } else if (number < 20) {
    return belasan[number - 10];
  } else if (number < 100) {
    return `${puluhan[Math.floor(number / 10)]} ${satuan[number % 10]}`.trim();
  } else {
    return "Angka di luar jangkauan";
  }
};
