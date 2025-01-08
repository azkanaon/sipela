// src/utils/generateDoc.js
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { documentTypes } from "../utils/documentTypes";

// Function to validate required data
const validateData = (data) => {
  const firstItem = data;
  return firstItem;
};

// Function to load the template
const loadTemplate = async (templateFile) => {
  try {
    const response = await fetch(templateFile, {
      method: "GET",
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.statusText}`);
    }

    // Get the ArrayBuffer directly
    const buffer = await response.arrayBuffer();
    return buffer;
  } catch (error) {
    console.error("Template loading error:", error);
    throw new Error(`Failed to load template: ${error.message}`);
  }
};

// Modified generateDocument function to handle multiple documents
export const generateDocuments = async (data, documentConfigs) => {
  const results = [];

  for (const [index, config] of documentConfigs.entries()) {
    try {
      const { type, numberRegister } = config;
      const docConfig = documentTypes[type];

      if (!docConfig) {
        throw new Error(`Tipe dokumen ${type} tidak ditemukan`);
      }

      // Validate data based on document type
      const validatedData =
        index === 0 ? validateData(data) : validateData(data.surat_pengantar);

      // Load template
      const content = await loadTemplate(docConfig.templateFile);
      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Map data using document-specific mapping function
      const templateData = docConfig.mapData(validatedData, numberRegister);

      // Render document
      doc.render(templateData);

      const output = doc.getZip().generate({ type: "blob" });

      // Create and trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(output);
      link.download = `${type}_${data.surat_pengantar.nama_lengkap}.docx`;
      link.click();

      results.push({ index, type, success: true }); // Menyimpan indeks
    } catch (error) {
      console.error(`Error generating ${config.type}:`, error);
      results.push({
        index, // Menyimpan indeks di sini
        type: config.type,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
};
