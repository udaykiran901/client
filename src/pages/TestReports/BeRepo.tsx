import React, { useState } from "react";
import axios from "axios";

export const fetchPDF = async () => {
    try {
        const response = await axios.get("http://localhost:8081/api/reports/generate-pdf", {
            responseType: "blob", // Get binary data
        });

        // Create a URL for the PDF blob
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Open the URL in a new window
        window.open(url, "_blank");
    } catch (error) {
        console.error("Error fetching PDF:", error);
    }
};

const PdfViewer: React.FC = () => {


    return (
        <div>
            <button onClick={fetchPDF}>Generate and Open PDF</button>
        </div>
    );
};

export default PdfViewer;
