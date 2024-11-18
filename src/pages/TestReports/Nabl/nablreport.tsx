import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Import the font files
import numberToWords from "number-to-words"; // Import the number-to-words package

// Set the font for pdfmake
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const amountInWords = (amount) => {
    const options = {
        language: "en-IN",
        units: ["", "Thousand", "Lakh", "Crore"],
        conjunction: "and",
    };

    const words = numberToWords.toWords(amount, options);
    return `${words} Rupees Only`;
};

const calculateDiscountAmount = (totalPrice, discountPercentage) => {
    const discountAmount = totalPrice * (discountPercentage / 100);
    return discountAmount;
};

// Function to generate the PDF document
const generatePdf = (data: any, billData: any, pdfDetails: any) => {
    // Define document styles
    const styles = {
        title: {
            fontSize: 24,
            bold: true,
        },
        header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
        },
        tableHeader: {
            fontSize: 10,
            color: "black",
            fillColor: "#CCCCCC",
        },
        defaultStyle: {
            font: "Helvetica", // Use default font or any web font available
        },
        listItem: {
            fontSize: 8,
        },
    };

    // Check if billData and orderDetails are defined, and provide defaults
    const discountPercentage = billData?.orderDetails?.discount || 0;
    const transportationFee = billData?.orderDetails?.transportation_fee || 0;

    // Generate the content for the table
    const createContent = () => {
        let content: any = [
            [{ text: "S.No", style: "tableHeader" }, { text: "Particulars", style: "tableHeader" }, { text: "Discipline", style: "tableHeader" }, { text: "Price", style: "tableHeader" }],
        ];

        let serialNumber = 1;
        let totalPrice = 0;

        data.forEach((sample: any) => {
            const row: any = [];
            row.push({ text: serialNumber++, rowSpan: sample.parameters.length + 1, fontSize: 9 });
            row.push({ text: `Testing of ${sample.sampleName}`, colSpan: 3, fontSize: 9, bold: true });
            content.push(row);

            sample.parameters.forEach((param: any) => {
                const paramNames = param.group.join(",\n");
                const paramRow: any = [];
                paramRow.push("");
                paramRow.push({ text: paramNames, fontSize: 9 });
                paramRow.push({ text: param.discipline, fontSize: 9 });
                paramRow.push({ text: param.price, fontSize: 9 });
                totalPrice += parseFloat(param.price);
                content.push(paramRow);
            });
        });

        const discountAmount = calculateDiscountAmount(totalPrice, discountPercentage);
        const subtotal = totalPrice - discountAmount + parseFloat(transportationFee);
        const gst = calculateDiscountAmount(subtotal, 18);

        const finalCols = [
            { key: "Sub Total", value: totalPrice },
            { key: `Discount (${discountPercentage}% of ${totalPrice})`, value: discountAmount },
            { key: "Total after discount (A)", value: totalPrice - discountAmount },
            { key: "Transportation Fees (B)", value: transportationFee },
            { key: "Sub Total (C = A + B)", value: subtotal },
            { key: `GST 18% of C (D)`, value: gst },
            { key: `Final Price (C + D)`, value: subtotal + gst },
        ];

        finalCols.forEach((eachRow: any) => {
            const row: any = [];
            row.push({ text: eachRow.key, colSpan: 3, alignment: "right", fontSize: 10, bold: true });
            row.push("", "");
            row.push({ text: eachRow.value, fontSize: 10, colSpan: 1, bold: true });
            content.push(row);
        });

        const amountInWordsRow = [{ text: amountInWords(subtotal + gst), fontSize: 10, colSpan: 4, italics: true, alignment: "right" }];
        content.push(amountInWordsRow);
        console.log(content, 'content');
        return content;
    };

    // Define the document definition
    const docDefinition = {
        pageMargins: [40, 90, 40, 60],
        content: [
            { text: "PROFORMA INVOICE", alignment: "center", fontSize: 15, margin: [0, 0, 0, 10], color: "red" },
            { text: `Invoice No: ${pdfDetails.invoiceNumber}`, alignment: "left", fontSize: 12 },
            { text: `Date: ${new Date().toLocaleDateString()}`, alignment: "left", fontSize: 12 },
            {
                table: {
                    headerRows: 1,
                    widths: ["auto", "*", "auto", "auto"],
                    body: createContent(),
                },
            },
            { text: "For KDM Engineers Group", alignment: "right", fontSize: 10 },
            { text: "Authorised Sign", alignment: "right", fontSize: 10, bold: true, margin: [0, 50, 20, 0] },
        ],
        styles: styles,
    };

    // Create the PDF
    const pdfDoc = pdfMake.createPdf(docDefinition);
    // pdfDoc.download(pdfDetails.pdfName);
    pdfDoc.open();
};

export const handleGeneratePdf = () => {
    // setIsGenerating(true);
    const data = [
        // Add your actual data here
        {
            sampleName: "Sample 1",
            parameters: [
                {
                    group: ["Group 1", "Group 2"],
                    discipline: "Discipline 1",
                    price: "500"
                },
                {
                    group: ["Group 3"],
                    discipline: "Discipline 2",
                    price: "200"
                }
            ]
        },
        {
            sampleName: "Sample 2",
            parameters: [
                {
                    group: ["Group 4"],
                    discipline: "Discipline 3",
                    price: "300"
                }
            ]
        }
    ]; // Example data, replace with actual data
    const billData = {
        orderDetails: {
            discount: 10,
            transportation_fee: "50"
        }
    }; // Example billData, replace with actual bill data
    const pdfDetails = { pdfName: "Invoice_1234.pdf", invoiceNumber: "1234" }; // Customize as needed
    generatePdf(data, billData, pdfDetails);
    // setIsGenerating(false);
};

// React component for PDF generation
const GeneratePdfButton = () => {
    const [isGenerating, setIsGenerating] = useState(false);



    return (
        <button onClick={handleGeneratePdf} disabled={isGenerating}>
            {isGenerating ? "Generating PDF..." : "Generate PDF"}
        </button>
    );
};

export default GeneratePdfButton;