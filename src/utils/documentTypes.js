import suratPengantarTemplate from "../assets/surat/surat_pengantar.docx";
import suratUsahaTemplate from "../assets/surat/surat_keterangan_usaha.docx";
import templateAhliWaris from "../assets/surat/surat_ahli_waris.docx";
import templateAhliWarisJejaka from "../assets/surat/surat_ahli_waris_jejaka_perawan.docx";
import templateBedaNama from "../assets/surat/surat_beda_nama.docx";
import templateDomisiliWNA from "../assets/surat/surat_domisili_wna.docx";
import templateDomisiliWNITetap from "../assets/surat/surat_domisili_wni_tetap.docx";
import templatePernyataan from "../assets/surat/surat_pernyataan.docx";
import templateTidakMenikah from "../assets/surat/surat_tidak_menikah_lagi_duda_janda.docx";
import templateMeninggalLebih30 from "../assets/surat/surat_mati_lebih_30.docx";
import templateMeninggalKurang30 from "../assets/surat/surat_mati_kurang_30.docx";
import templateDomisiliLembaga from "../assets/surat/surat_domisili_lembaga.docx";
import templateDomisiliPerusahaan from "../assets/surat/surat_domisili_perusahaan.docx";
import templateKurangPbb from "../assets/surat/surat_pengurangan_pbb.docx";
import templateTidakMampuBerobat from "../assets/surat/surat_tidak_mampu_berobat_UHC.docx";

import {
  formatDate,
  formatDateWithoutDay,
  getDay,
  getDayName,
  getMonth,
  getYear,
  numberToWords,
} from "./formattedData";

export const documentTypes = {
  // Template
  surat_pengantar: {
    templateFile: suratPengantarTemplate,
    mapData: (data) => {
      return {
        rt: data.surat_pengantar.rt,
        rw: data.surat_pengantar.rw,
        nama_pengaju: data.surat_pengantar.nama_lengkap,
        lahir_tempat: data.surat_pengantar.tempat_lahir,
        lahir_tgl: formatDateWithoutDay(data.surat_pengantar.tanggal_lahir),
        kelamin: data.surat_pengantar.jenis_kelamin,
        agama: data.surat_pengantar.agama,
        status_kawin: data.surat_pengantar.status_kawin,
        kerja: data.surat_pengantar.pekerjaan,
        kk: data.surat_pengantar.kk,
        ktp: data.surat_pengantar.nik,
        alamat: data.surat_pengantar.alamat,
        catatan: data.surat_pengantar.maksud_keperluan,
        no_reg_rt: data.surat_pengantar.nomor_register_pengantar_rt,
        no_reg_rw: data.surat_pengantar.nomor_register_pengantar_rw,
      };
    },
  },

  surat_pernyataan: {
    templateFile: templatePernyataan,
    mapData: (data) => {
      const getPernyataanText = () => {
        switch (data.jenis_surat.nama) {
          //
          case "Keterangan Usaha":
            return "saya benar-benar memiliki usaha seperti yang tercantum dalam data dan akan bertanggung jawab penuh atas pernyataan ini.";
          //
          case "Beda Nama":
            return "nama-nama tersebut di atas adalah benar nama saya dengan orang yang sama dan akan bertanggung jawab penuh atas pernyataan ini.";
          //
          case "Ahli Waris 1":
            return "Surat Pernyataan Bersama Para Ahli Waris ini kami buat dengan sebenarnya dan tanpa paksaan dari pihak manapun, serta dibuat dalam keadaan sadar, sehat jasmani maupun rohani dan tidak ada satupun ahli waris yang terlewat.";
          case "Ahli Waris 2":
            return "Surat Pernyataan Bersama Para Ahli Waris ini kami buat dengan sebenarnya dan tanpa paksaan dari pihak manapun, serta dibuat dalam keadaan sadar, sehat jasmani maupun rohani dan tidak ada satupun ahli waris yang terlewat.";
          //
          case "Domisili WNA":
            return "Dengan ini menyatakan bahwa saya benar tinggal di lokasi yang sesuai dengan dokumen yang telah saya lampirkan.";
          //
          case "Domisili WNI Tetap":
            return "Dengan ini menyatakan bahwa saya adalah Warga Negara Indonesia yang bertempat tinggal secara tetap sebagaimana tercantum dalam dokumen yang saya lampirkan.";
          //
          case "Domisili WNI Tidak Tetap":
            return "Dengan ini menyatakan bahwa saya adalah Warga Negara Indonesia yang bertempat tinggal sementara sebagaimana tercantum dalam dokumen yang telah saya lampirkan.";
          //
          case "Domisili Perusahaan":
            return "Dengan ini menyatakan bahwa perusahaan kami benar beroperasi di alamat yang sesuai dengan dokumen yang telah dilampirkan.";
          //
          case "Domisili Lembaga":
            return "Dengan ini menyatakan bahwa lembaga kami benar berlokasi sesuai dengan dokumen pendukung yang telah dilampirkan.";
          //
          case "Tidak Mampu Berobat UHC":
            return "Dengan ini menyatakan bahwa saya tidak mampu membiayai pengobatan secara mandiri dan telah melampirkan dokumen pendukung untuk mendapatkan bantuan melalui program Universal Health Coverage (UHC).";
          //
          case "Taksiran Harga Tanah":
            return "Dengan ini menyatakan bahwa taksiran harga tanah sesuai dengan data yang telah saya lampirkan.";
          //
          case "Tidak Menikah Lagi Duda/Janda":
            return "Dengan ini menyatakan bahwa sampai saat ini saya belum menikah lagi setelah berstatus duda/janda, sesuai dengan data yang telah dilampirkan.";
          //
          default:
            return "Pesan Default";
        }
      };

      return {
        nama_pengaju: data.nama_lengkap,
        ktp: data.nik,
        tanggal_kk: formatDateWithoutDay(data.tanggal_kk),
        nomor_kk: data.kk,
        kelamin: data.jenis_kelamin,
        lahir_tempat: data.tempat_lahir,
        lahir_tgl: formatDateWithoutDay(data.tanggal_lahir),
        agama: data.agama,
        pekerjaan: data.pekerjaan,
        status_kawin: data.status_kawin,
        alamat: data.alamat,
        tujuan: data.maksud_keperluan,
        rt: data.rt,
        rw: data.rw,
        no_rt: data.nomor_register_pengantar_rt,
        no_rw: data.nomor_register_pengantar_rw,
        no_lurah: data.nomor_register_pengantar_kelurahan,
        pernyataan: getPernyataanText(),
      };
    },
  },

  // Template
  "Keterangan Usaha": {
    templateFile: suratUsahaTemplate,
    mapData: (data) => ({
      nik: data.keterangan_usaha[0].nik,
      kk: data.keterangan_usaha[0].kk,
      nama: data.keterangan_usaha[0].nama,
      tempat_lahir: data.keterangan_usaha[0].tempat_lahir,
      tanggal_lahir: data.keterangan_usaha[0].tanggal_lahir,
      jenis_kelamin: data.keterangan_usaha[0].jenis_kelamin,
      kewarganegaraan: data.keterangan_usaha[0].kewarganegaraan,
      status_kawin: data.keterangan_usaha[0].status_kawin,
      pekerjaan: data.keterangan_usaha[0].pekerjaan,
      agama: data.keterangan_usaha[0].agama,
      rt: data.keterangan_usaha[0].rt,
      rw: data.keterangan_usaha[0].rw,
      alamat: data.keterangan_usaha[0].alamat,
      tujuan: data.keterangan_usaha[0].tujuan_surat,
      nama_usaha: data.keterangan_usaha[0].nama_usaha,
      lokasi_usaha: data.keterangan_usaha[0].lokasi_usaha,
      tahun_berdiri: data.keterangan_usaha[0].tahun_usaha,
      no_reg_rt: data.nomor_register_pengantar_rt,
      no_reg_lurah: data.nomor_register_pengantar_kelurahan,
    }),
  },

  "Ahli Waris 1": {
    templateFile: templateAhliWarisJejaka,
    mapData: (data) => {
      const ahliWarisData = data.ahli_waris;

      // Format ahli waris data into the required template structure
      const formattedAhliWaris = ahliWarisData[0].ahli_waris.map((waris) => ({
        [`nama_ahli_waris`]: waris.nama,
        [`umur_ahli_waris`]: waris.umur,
        [`umur_pewaris_eja`]: numberToWords(waris.umur),
      }));

      return {
        // Basic information
        nama_almarhum: ahliWarisData[0].nama_almarhum,
        pasangan: ahliWarisData[0].nama_pasangan,
        tanggal_meninggal: formatDateWithoutDay(
          ahliWarisData[0].tanggal_meninggal
        ).toString(),
        // Address information
        tempat_tinggal: ahliWarisData[0].alamat_terakhir,
        rt: data.rt,
        rw: data.rw,

        // Children information
        jumlah_anak: ahliWarisData[0].ahli_waris.length,
        jumlah_anak_eja: numberToWords(ahliWarisData[0].ahli_waris.length),

        saksi_1: ahliWarisData[0].saksi[0].nama,
        saksi_2: ahliWarisData[0].saksi[1].nama,

        // Include formatted ahli waris data here
        ahli_waris: formattedAhliWaris,
        no_reg_rt: data.nomor_register_pengantar_rt,
        no_reg_rw: data.nomor_register_pengantar_rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
      };
    },
  },

  "Ahli Waris 2": {
    templateFile: templateAhliWaris,
    mapData: (data) => {
      const ahliWarisData = data.ahli_waris;

      // Format ahli waris data into the required template structure
      const formattedAhliWaris = ahliWarisData[0].ahli_waris.map((waris) => ({
        [`nama_pewaris`]: waris.nama,
        [`umur_pewaris`]: waris.umur,
        [`umur_pewaris_eja`]: numberToWords(waris.umur),
      }));

      return {
        // Basic information
        // Father's information
        nama_bapak: ahliWarisData[0].nama_almarhum,
        hari_bapak: getDayName(ahliWarisData[0].tanggal_meninggal),
        tanggal_bapak: getDay(ahliWarisData[0].tanggal_meninggal),
        bulan_bapak: getMonth(ahliWarisData[0].tanggal_meninggal),
        tahun_bapak: getYear(ahliWarisData[0].tanggal_meninggal),
        tempat_meninggal_bapak: ahliWarisData[0].alamat_terakhir,

        // Mother's information (if needed)
        nama_ibu: ahliWarisData[1].nama_almarhum,
        tanggal_ibu: getDay(ahliWarisData[1].tanggal_meninggal),
        bulan_ibu: getMonth(ahliWarisData[1].tanggal_meninggal),
        tahun_ibu: getYear(ahliWarisData[1].tanggal_meninggal),
        tempat_meninggal_ibu: ahliWarisData[1].alamat_terakhir,

        // Address information
        tempat_tinggal: ahliWarisData[0].alamat_terakhir,
        rt: data.rt,
        rw: data.rw,

        // Children information
        jumlah_anak: ahliWarisData[0].ahli_waris.length,
        jumlah_anak_eja: numberToWords(ahliWarisData[0].ahli_waris.length),

        nama_saksi_1: ahliWarisData[0].saksi[0].nama,
        nama_saksi_2: ahliWarisData[0].saksi[1].nama,

        // Include formatted ahli waris data here
        ahli_waris: formattedAhliWaris,
        no_reg_rt: data.nomor_register_pengantar_rt,
        no_reg_rw: data.nomor_register_pengantar_rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
      };
    },
  },

  "Beda Nama": {
    templateFile: templateBedaNama,
    mapData: (data) => ({
      nik: data.beda_nama[0].nik,
      kk: data.beda_nama[0].kk,
      nama: data.beda_nama[0].nama,
      tempat: data.beda_nama[0].tempat_lahir,
      tanggal_lahir: formatDateWithoutDay(data.beda_nama[0].tanggal_lahir),
      gender: data.beda_nama[0].jenis_kelamin,
      kewarganegaraan: data.beda_nama[0].kewarganegaraan,
      status_kawin: data.beda_nama[0].status_kawin,
      pekerjaan: data.beda_nama[0].pekerjaan,
      agama: data.beda_nama[0].agama,
      rt: data.beda_nama[0].rt,
      rw: data.beda_nama[0].rw,
      alamat: data.beda_nama[0].alamat,
      no_reg_rt: data.nomor_register_pengantar_rt,
      no_reg_lurah: data.nomor_register_pengantar_kelurahan,
    }),
  },

  "Domisili WNI Tetap": {
    templateFile: templateDomisiliWNITetap,
    mapData: (data) => ({
      nik: data.domisili_wni_tetap[0].nik,
      kk: data.domisili_wni_tetap[0].kk,
      nama: data.domisili_wni_tetap[0].nama,
      tempat: data.domisili_wni_tetap[0].tempat_lahir,
      tanggal_lahir: formatDateWithoutDay(
        data.domisili_wni_tetap[0].tanggal_lahir
      ),
      gender: data.domisili_wni_tetap[0].jenis_kelamin,
      kewarganegaraan: data.domisili_wni_tetap[0].kewarganegaraan,
      status_kawin: data.domisili_wni_tetap[0].status_kawin,
      pekerjaan: data.domisili_wni_tetap[0].pekerjaan,
      agama: data.domisili_wni_tetap[0].agama,
      rt: data.domisili_wni_tetap[0].rt,
      rw: data.domisili_wni_tetap[0].rw,
      alamat: data.domisili_wni_tetap[0].alamat,
      no_reg_rt: data.nomor_register_pengantar_rt,
      no_reg_lurah: data.nomor_register_pengantar_kelurahan,
      tujuan: data.domisili_wni_tetap[0].tujuan_surat,
    }),
  },

  "Domisili WNA": {
    templateFile: templateDomisiliWNA,
    mapData: (data) => ({
      nama: data.domisili_wna[0].nama,
      no_paspor: data.domisili_wna[0].no_paspor,
      tanggal_paspor: data.domisili_wna[0].tanggal_buat_paspor,
      gender: data.domisili_wna[0].jenis_kelamin,
      tempat: data.domisili_wna[0].tempat_lahir,
      tanggal_lahir: formatDateWithoutDay(data.domisili_wna[0].tanggal_lahir),
      kewarganegaraan: data.domisili_wna[0].kewarganegaraan,
      pekerjaan: data.domisili_wna[0].pekerjaan,
      tujuan: data.domisili_wna[0].tujuan_surat,
      alamat: data.domisili_wna[0].alamat_domisili,
      rt: data.domisili_wna[0].rt,
      rw: data.domisili_wna[0].rw,
      no_reg_lurah: data.nomor_register_pengantar_kelurahan,
      no_reg_rt: data.nomor_register_pengantar_rt,
    }),
  },

  "Tidak Menikah Lagi Duda Janda": {
    templateFile: templateTidakMenikah,
    mapData: (data) => ({
      nama: data.tidak_menikah_duda_janda[0].nama,
      nik: data.tidak_menikah_duda_janda[0].nik,
      kk: data.tidak_menikah_duda_janda[0].kk,
      tanggal_kk: formatDateWithoutDay(
        data.tidak_menikah_duda_janda[0].tanggal_kk
      ),
      gender: data.tidak_menikah_duda_janda[0].jenis_kelamin,
      tempat: data.tidak_menikah_duda_janda[0].tempat_lahir,
      tanggal_lahir: formatDateWithoutDay(
        data.tidak_menikah_duda_janda[0].tanggal_lahir
      ),
      kewarganegaraan: data.tidak_menikah_duda_janda[0].kewarganegaraan,
      status_kawin: data.tidak_menikah_duda_janda[0].status_kawin,
      pekerjaan: data.tidak_menikah_duda_janda[0].pekerjaan,
      agama: data.tidak_menikah_duda_janda[0].agama,
      alamat: data.tidak_menikah_duda_janda[0].alamat,
      rt: data.tidak_menikah_duda_janda[0].rt,
      rw: data.tidak_menikah_duda_janda[0].rw,
      no_reg_lurah: data.nomor_register_pengantar_kelurahan,
      no_reg_rt: data.nomor_register_pengantar_rt,
    }),
  },

  "Kematian Lebih dari 30 hari": {
    templateFile: templateMeninggalLebih30,
    mapData: (data) => {
      return {
        alm_nama: data.mati_lebih_30hari[0].nama,
        alm_nik: data.mati_lebih_30hari[0].nik,
        alm_kk: data.mati_lebih_30hari[0].kk,
        alm_kelamin: data.mati_lebih_30hari[0].jenis_kelamin,
        alm_tempat_lahir: data.mati_lebih_30hari[0].tempat_lahir,
        alm_tgl_lahir: formatDateWithoutDay(
          data.mati_lebih_30hari[0].tanggal_lahir
        ),
        alm_negara: data.mati_lebih_30hari[0].kewarganegaraan,
        alm_kawin: data.mati_lebih_30hari[0].status_kawin,
        alm_kerja: data.mati_lebih_30hari[0].pekerjaan,
        alm_agama: data.mati_lebih_30hari[0].agama,
        alm_alamat: data.mati_lebih_30hari[0].alamat,
        alm_hari_tgl: formatDate(data.mati_lebih_30hari[0].tanggal_meninggal),
        alm_jam: data.mati_lebih_30hari[0].waktu_meninggal,
        alm_tempat_mati: data.mati_lebih_30hari[0].tempat_meninggal,
        alm_makam: data.mati_lebih_30hari[0].tempat_dimakamkan,
        pelapor_nama: data.mati_lebih_30hari[0].nama_pelapor,
        pelapor_nik: data.mati_lebih_30hari[0].nik_pelapor,
        pelapor_kelamin: data.mati_lebih_30hari[0].jenis_kelamin_pelapor,
        pelapor_tempat_lahir: data.mati_lebih_30hari[0].tempat_lahir_pelapor,
        pelapor_tgl_lahir: formatDateWithoutDay(
          data.mati_lebih_30hari[0].tanggal_lahir_pelapor
        ),
        pelapor_kawin: data.mati_lebih_30hari[0].status_kawin_pelapor,
        pelapor_kerja: data.mati_lebih_30hari[0].pekerjaan_pelapor,
        pelapor_agama: data.mati_lebih_30hari[0].agama_pelapor,
        pelapor_alamat: data.mati_lebih_30hari[0].alamat_pelapor,
        pelapor_hubungan: data.mati_lebih_30hari[0].hubungan,
        rt: data.mati_lebih_30hari[0].rt,
        rw: data.mati_lebih_30hari[0].rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
        no_reg_rt: data.nomor_register_pengantar_rt,
      };
    },
  },

  "Kematian Kurang dari 30 hari": {
    templateFile: templateMeninggalKurang30,
    mapData: (data) => {
      return {
        alm_nama: data.mati_kurang_30hari[0].nama,
        alm_nik: data.mati_kurang_30hari[0].nik,
        alm_kelamin: data.mati_kurang_30hari[0].jenis_kelamin,
        alm_alamat: data.mati_kurang_30hari[0].alamat,
        alm_kk: data.mati_kurang_30hari[0].kk,
        alm_umur: data.mati_kurang_30hari[0].usia,
        alm_hari_tgl: formatDate(
          data.mati_kurang_30hari[0].tanggal_meninggal
        ).split(",")[0],
        alm_tanggal_mati: formatDate(
          data.mati_kurang_30hari[0].tanggal_meninggal
        ).split(",")[1],
        alm_tempat_mati: data.mati_kurang_30hari[0].tempat_meninggal,
        alm_sebab: data.mati_kurang_30hari[0].sebab_kematian,
        pelapor_nama: data.mati_kurang_30hari[0].nama_pelapor,
        pelapor_hubungan: data.mati_kurang_30hari[0].hubungan,
        rt: data.mati_kurang_30hari[0].rt,
        rw: data.mati_kurang_30hari[0].rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
        no_reg_rt: data.nomor_register_pengantar_rt,
      };
    },
  },

  "Domisili Lembaga": {
    templateFile: templateDomisiliLembaga,
    mapData: (data) => {
      return {
        nama: data.domisili_lembaga[0].nama,
        nik: data.domisili_lembaga[0].nik,
        kk: data.domisili_lembaga[0].kk,
        gender: data.domisili_lembaga[0].jenis_kelamin,
        tempat: data.domisili_lembaga[0].tempat_lahir,
        tanggal_lahir: formatDateWithoutDay(
          data.domisili_lembaga[0].tanggal_lahir
        ),
        agama: data.domisili_lembaga[0].agama,
        kewarganegaraan: data.domisili_lembaga[0].kewarganegaraan,
        alamat: data.domisili_lembaga[0].alamat,
        no_npwp: data.domisili_lembaga[0].npwp,
        jabatan: data.domisili_lembaga[0].jabatan,
        tujuan: data.domisili_lembaga[0].tujuan_surat,
        rt: data.domisili_lembaga[0].rt,
        rw: data.domisili_lembaga[0].rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
        no_reg_rt: data.nomor_register_pengantar_rt,
      };
    },
  },

  "Domisili Perusahaan": {
    templateFile: templateDomisiliPerusahaan,
    mapData: (data) => {
      return {
        nama: data.domisili_perusahaan[0].nama,
        nik: data.domisili_perusahaan[0].nik,
        kk: data.domisili_perusahaan[0].kk,
        tanggal_kk: formatDateWithoutDay(
          data.domisili_perusahaan[0].tanggal_kk
        ),
        gender: data.domisili_perusahaan[0].jenis_kelamin,
        tempat_lahir: data.domisili_perusahaan[0].tempat_lahir,
        tanggal_lahir: formatDateWithoutDay(
          data.domisili_perusahaan[0].tanggal_lahir
        ),
        agama: data.domisili_perusahaan[0].agama,
        kewarganegaraan: data.domisili_perusahaan[0].kewarganegaraan,
        alamat: data.domisili_perusahaan[0].alamat,
        hp: data.domisili_perusahaan[0].telp,
        jabatan: data.domisili_perusahaan[0].jabatan,
        nama_perusahaan: data.domisili_perusahaan[0].nama_perusahaan,
        alamat_perusahaan: data.domisili_perusahaan[0].lokasi_usaha,
        tujuan: data.domisili_perusahaan[0].tujuan_surat,
        rt: data.domisili_perusahaan[0].rt,
        rw: data.domisili_perusahaan[0].rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
        no_reg_rt: data.nomor_register_pengantar_rt,
      };
    },
  },

  "Kurang Pbb": {
    templateFile: templateKurangPbb,
    mapData: (data) => {
      return {
        nama: data.kurang_pbb[0].nama,
        nik: data.kurang_pbb[0].nik,
        kk: data.kurang_pbb[0].kk,
        tanggal_kk: formatDateWithoutDay(data.kurang_pbb[0].tanggal_kk),
        tempat_lahir: data.kurang_pbb[0].tempat_lahir,
        tanggal_lahir: formatDateWithoutDay(data.kurang_pbb[0].tanggal_lahir),
        kewarganegaraan: data.kurang_pbb[0].kewarganegaraan,
        status_kawin: data.kurang_pbb[0].status_kawin,
        pekerjaan: data.kurang_pbb[0].pekerjaan,
        agama: data.kurang_pbb[0].agama,
        alamat: data.kurang_pbb[0].alamat,
        nop: data.kurang_pbb[0].nop,
        tujuan: data.kurang_pbb[0].tujuan_surat,
        rt: data.kurang_pbb[0].rt,
        rw: data.kurang_pbb[0].rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
        no_reg_rt: data.nomor_register_pengantar_rt,
      };
    },
  },

  "Tidak Mampu Berobat": {
    templateFile: templateTidakMampuBerobat,
    mapData: (data) => {
      return {
        nama: data.tidak_mampu_berobat[0].nama,
        nik: data.tidak_mampu_berobat[0].nik,
        kk: data.tidak_mampu_berobat[0].kk,
        tanggal_kk: formatDateWithoutDay(
          data.tidak_mampu_berobat[0].tanggal_kk
        ),
        gender: data.tidak_mampu_berobat[0].jenis_kelamin,
        tempat_lahir: data.tidak_mampu_berobat[0].tempat_lahir,
        tanggal_lahir: formatDateWithoutDay(
          data.tidak_mampu_berobat[0].tanggal_lahir
        ),
        kewarganegaraan: data.tidak_mampu_berobat[0].kewarganegaraan,
        status_kawin: data.tidak_mampu_berobat[0].status_kawin,
        pekerjaan: data.tidak_mampu_berobat[0].pekerjaan,
        agama: data.tidak_mampu_berobat[0].agama,
        alamat: data.tidak_mampu_berobat[0].alamat,
        rt: data.tidak_mampu_berobat[0].rt,
        rw: data.tidak_mampu_berobat[0].rw,
        no_reg_lurah: data.nomor_register_pengantar_kelurahan,
        no_reg_rt: data.nomor_register_pengantar_rt,
      };
    },
  },
};
