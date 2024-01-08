import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import Nilai from './nilai.entity';
import puppeteer from 'puppeteer';
import { Workbook } from 'exceljs';

@Injectable()
export class NilaiService {
  constructor(

    @InjectRepository(Nilai)
    private nilaiRepository: Repository<Nilai>,

  ) { }

  async get(siswa_id: string, status_seleksi: any, status_verifikasi: any, date: any, kode_pendaftaran: string, pages: number, limits: number) {

    let queryBuilder = this.nilaiRepository.createQueryBuilder('nilai')

    if (siswa_id) {
      queryBuilder = queryBuilder.where('nilai.siswa_id LIKE :siswa_id', { siswa_id: `%${siswa_id}%` });
    }

    if (status_seleksi) {
      queryBuilder = queryBuilder.where('nilai.status LIKE :statusSeleksi', { statusSeleksi: status_seleksi });
    }

    if (status_verifikasi) {
      queryBuilder = queryBuilder.where('siswa.status LIKE :status', { status: `%${status_verifikasi}%` });
    }

    if (date) {
      queryBuilder = queryBuilder.andWhere('nilai.created_at LIKE :date', { date: `%${date}%` });
    }

    if (kode_pendaftaran) {
      queryBuilder = queryBuilder.where('siswa.kode_pendaftaran LIKE :kode_pendaftaran', { kode_pendaftaran: `%${kode_pendaftaran}%` });
    }

    if (pages <= 0) {
      pages = 1;
    }

    const [data, totalData] = await queryBuilder
      .leftJoinAndSelect('nilai.siswa_id', 'siswa')
      .skip((pages - 1) * limits)
      .take(limits)
      .orderBy('nilai.created_at', 'ASC')
      .getManyAndCount();

    const totalPages = Math.ceil(totalData / limits);

    return {
      data: data || [],
      totalData,
      pages,
      limits,
      totalPages,
    };
  }

  async getId(id: string): Promise<any> {
    const findNilai = await this.nilaiRepository.findOne({
      where: { id },
      relations: ['siswa_id'],
    });
    if (!findNilai) throw new HttpException(`Nilai dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)
    return findNilai
  }

  async create(nilaiDTO: any): Promise<any> {
    const createSiswa = await this.nilaiRepository.save(nilaiDTO);
    return createSiswa
  }

  async update(id: string, payload: any): Promise<any> {
    const findNilai = await this.getId(id)

    if (!findNilai) throw new HttpException(`Nilai dengan id ${id} tidak ditemukan !`, HttpStatus.NOT_FOUND)

    await this.nilaiRepository.update(findNilai.id, payload)
    return await this.nilaiRepository.findOne({ where: { id: findNilai.id } })
  }

  async delete(id: string): Promise<void> {
    const findNilai = await this.getId(id)
    await this.nilaiRepository.delete(findNilai.id)
  }

  async generatepdf(id: string) {

    const findNilai: any = await this.nilaiRepository.findOne({
      where: {
        siswa_id: Like(`${id}`)
      },
      relations: ["siswa_id"]
    })


    const customData = {
      nilai_ujian: findNilai?.nilai_ujian,
      siswa_id: {
        id: findNilai.siswa_id?.id || '',
        nama_lengkap: findNilai.siswa_id?.nama_lengkap || '',
        ttl: `${findNilai?.siswa_id?.tempat_lahir}, ${findNilai?.siswa_id?.tanggal_lahir}` || '',
        nisn: findNilai.siswa_id?.nisn || '',
        kode_pendaftaran: findNilai.siswa_id?.kode_pendaftaran || '',
        data_wali: {
          nama_wali: findNilai?.siswa_id?.data_wali?.nama_wali
        }
      }
    };

    const currentDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const currentYear = new Date().getFullYear();
    const htmlContent =
      `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />
        
          <style>
            body {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: Arial, sans-serif;
            }
        
            h1,
            p {
              margin: 0;
            }
        
            .border-header {
              border-top: 3px rgb(3, 3, 3) solid;
              height: 10px;
              width: 100%;
              display: inline-block;
            }
        
            .border-header-2 {
              border-top: 5px rgb(3, 3, 3) solid;
              height: 10px;
              width: 100%;
              display: inline-block;
            }
        
            .ttd {
              right: 0%;
              position: absolute;
              margin-top: 5%;
              margin-right: 10%;
            }
        
            .ttd p {
              font-size: 15px;
            }
          </style>
        </head>
        
        <body>
          <div id="pdf" class="a4-container" style="overflow-x: hidden;">
            <div class="header">
              <div class="content d-flex ms-1 gap-5 align-items-center justify-content-center mt-4"
                style="margin-left: -100px;">
                <div class="image-content" style="margin-left: -100px;">
                  <img src="http://localhost:8080/api/v1/upload/8efc84dee39d1c2df0dac3d7656bc717.jpg" width="150" alt="" />
                </div>
                <div class="text-content" style="display: block; font-family: serif; margin-top: 20px; text-align: center;">
                  <span style="font-size: 20px;">MADRASAH IBTIDAIYAH</span>
                  <p style="font-size: 47px;">MISBAHUL ULUM</p>
                  <p style="font-size: 13px; margin-top: -2%;">Desa Kamuning, Kecamatan Sampang, Kabupaten Sampang</p>
                  <p style="font-size: 13px; margin-top: -1%;">Tlp. 085330232687 - 087750223060</p>
                  <p style="font-size: 13px; margin-top: -1%;">Akta Notaris : AHU-0008233.AH.01.04.Tahun 2015</p>
                </div>
              </div>
              <div class="border-grup">
                <div class="border-header"></div>
              </div>
              <div class="border-grup" style="margin-top: -15px;">
                <div class="border-header-2"></div>
              </div>
              <div class="text-sku text-center"
                style="font-weight: bold; font-family: serif; font-size: 23px; text-decoration: underline; margin-top: 2%;">
                SURAT KETERANGAN LULUS
              </div>
              <p class="text-center" style="font-family: serif; font-size: 20px; margin-top: -7px;">Nomor: 0421/SKL-MU/V/${currentYear}
              </p>
            </div>
            <div class="body-content">
              <div class="text-1" style="margin-left: 11%; margin-top: 2%;">
                <p style="text-indent: 25px; font-size: 15px; width: 90%;">Yang bertanda tangan di bawah ini Kepala Madrasah
                  Ibtidaiyah (MI)
                  MISBAHUL ULUM, menerangkan bahwa:</p>
              </div>
              <ul style="list-style: none; padding-left: 18%; margin-top: 3%;">
                <li class="d-flex my-2">
                  <div style="width: 30%;">Nama</div>
                  <div>:</div>
                  <div class="ms-2">${customData.siswa_id.nama_lengkap}</div>
                </li>
                <li class="d-flex my-2">
                  <div style="width: 30%;">Tempat, Tanggal Lahir</div>
                  <div>:</div>
                  <div class="ms-2">${customData.siswa_id.ttl}</div>
                </li>
                <li class="d-flex my-2">
                  <div style="width: 30%;">NISN</div>
                  <div>:</div>
                  <div class="ms-2">${customData.siswa_id.nisn}</div>
                </li>
                <li class="d-flex my-2">
                  <div style="width: 30%;">NAMA ORANG TUA</div>
                  <div>:</div>
                  <div class="ms-2">${customData.siswa_id.data_wali.nama_wali}</div>
                </li>
                <li class="d-flex my-2">
                  <div style="width: 30%;">No. Peserta UM</div>
                  <div>:</div>
                  <div class="ms-2">${customData.siswa_id.kode_pendaftaran}</div>
                </li>
              </ul>
              <div class="status"
                style="text-align: center; margin-top: 5%; font-family: serif; font-size: 20px; text-decoration: underline;">
                <p style="border: 5px;">LULUS</p>
              </div>
              <div class="text-2" style="margin-left: 11%; margin-top: 3%;">
                <p style="text-indent: 25px; font-size: 15px; width: 90%;">
                  Dari Satuan Pendidikan berdasarkan hasil Ujian Madrasah (UM) serta telah
                  memenuhi kriteria kelulusan sesuai ketetapan yang berlaku di Madrasah
                  Ibtidaiyah MISBAHUL ULUM dengan nilai <span style="font-weight: bold;">${customData?.nilai_ujian}</span>.
                </p>
              </div>
              <div class="text-3" style="margin-left: 11%; margin-top: 3%;">
                <p style="text-indent: 25px; font-size: 15px; width: 90%;">
                  Surat Keterangan ini berlaku sampai dengan diterbitkannya Ijazah yang
                  sah. Jika dikemudian hari terdapat kesalahan dalam penulisan surat keterangan
                  ini, maka akan diperbaiki sebagaimana mestinya.
                </p>
              </div>
            </div>
            <div class="ttd">
              <img src="http://localhost:8080/api/v1/upload/58fed6d791006cb36457c7cb8beba7edc.png"
                style="position: absolute; z-index: -50; right: 70%; top: -10%;" width="200" alt="" />
              <img src="http://localhost:8080/api/v1/upload/ce4a8b88355d75343c5dfe410afb4da63.png"
                style="position: absolute; z-index: 50; right: 10%; top: -8%;" width="220" alt="" />
              <p>Sampang, ${currentDate}</p>
              <p style="margin-top: -6px;">Kepala Madrasah</p>
              <p style="margin-top: 50%;">ABD. ROUF, S.Pd.I</p>
              <p style="margin-top: -8px;">NIP.-</p>
            </div>
          </div>
        </body>
        
        </html>`

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    // await page.waitForTimeout(2000);
    const pdfBuffer = await page.pdf();

    await browser.close();

    return pdfBuffer;
  }

  async generateExcel() {
    const nilai = await this.nilaiRepository.find({
      relations: ["siswa_id"]
    })

    const workbook = new Workbook
    const worksheet = workbook.addWorksheet('Hasil Seleksi')

    worksheet.columns = [
      { header: 'Nama', key: 'nama_lengkap', width: 20 },
      { header: 'NISN', key: 'nisn', width: 15 },
      { header: 'Nilai Rapot', key: 'nilai_rapot', width: 15 },
      { header: 'Nilai Ujian', key: 'nilai_ujian', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    nilai.forEach((val: any) => {
      const rowData = {
        nama_lengkap: val.siswa_id?.nama_lengkap,
        nisn: val.siswa_id?.nisn,
        nilai_rapot: val.nilai_rapot,
        nilai_ujian: val.nilai_ujian,
        status: val.status,
      };
      worksheet.addRow(rowData)
    })
    return workbook.xlsx.writeBuffer();
  }
}
