import pdf from 'pdf-parse';
export async function GET() {
    const response = await fetch('https://bitcoin.org/bitcoin.pdf');

    const pdfData = await response.arrayBuffer();
    console.log("STEP 1: RAW PDF BUFFER 👉", pdfData);

    const buffer = Buffer.from(pdfData);
    console.log("STEP 2: CONVERTED TO BUFFER 👉", buffer);
console.log("BUFFER LENGTH:", buffer.length);
    const data = await pdf(buffer);
    console.log("STEP 3: PDF DATA 👉", data);
    
    return Response.json({ 
    text: data.text,
    pages: data.numpages 
  });
}
