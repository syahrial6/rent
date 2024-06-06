"use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import swal from 'sweetalert'


export default function Home() {
  const [formData, setFormData] = useState({
    tanggal: '',
    nama_layanan: '',
    mobil: '',
    nama_driver: '',
    keterangan: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwWyygUupIKE-QfRXBaxtnSIiahPh2A2shIi8xnLrixeJpbgDLUEmSWWeLY2ijKYuxq/exec';

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach(key => formDataObj.append(key, formData[key]));

      const response = await axios.post(scriptURL, formDataObj);

      if (response.status === 200) {
        setStatus('Success!');
        console.log('Success!', response);
        swal("Good job!", "Data Telah Disimpan", "success");
      } else {
        setStatus('Error!');
        console.error('Error!', response.statusText);
        swal("Error!", `${response.statusText}`, "error");
      }
    } catch (error) {
      setStatus('Error!');
      console.error('Error!', error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Form Penggunaan Mobil</h2>
    <Image
      src="/image/images.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
    />
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Tanggal</label>
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nama Layanan</label>
        <input
          type="text"
          name="nama_layanan"
          value={formData.namaLayanan}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mobil</label>
        <input
          type="text"
          name="mobil"
          value={"KB 1392 DY"}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nama Driver</label>
        <input
          type="text"
          name="nama_driver"
          value={formData.namaDriver}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Keterangan</label>
        <textarea
          name="keterangan"
          value={formData.keterangan}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  );
}
